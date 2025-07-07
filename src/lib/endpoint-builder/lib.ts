import axios, { AxiosError, AxiosInstance, AxiosProgressEvent, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Defines the structure of an API endpoint, including HTTP method, path,
 * and optional settings for mocking, delays, and cancellation.
 *
 * @template P - Type of URL parameters
 * @template B - Type of request body
 */
export interface EndpointDescriptor<P = any, B = any> {
	/** HTTP method, e.g. GET, POST, PUT, DELETE */
	method: AxiosRequestConfig["method"];
	/** URL or route for the endpoint, relative to baseURL */
	route: string;
	/** Optional query parameters to include in the request URL */
	params?: P;
	/** Optional payload to include in the request body */
	body?: B;
	/** Optional custom headers for the request */
	headers?: Record<string, string>;
	/** If true, bypasses all configured Axios interceptors */
	ignoreInterceptors?: boolean;

	/**
	 * Mock response data to return instead of making a real HTTP call.
	 * If provided, and mock mode is enabled, this data is returned.
	 */
	mockData?: any;
	/**
	 * Delay in milliseconds before returning mockData, if mocking is enabled.
	 */
	mockDelayMs?: number;

	/**
	 * Default delay in milliseconds before sending a real HTTP request.
	 */
	defaultDelayMs?: number;
	/**
	 * AbortSignal used to cancel the request when necessary.
	 */
	abortSignal?: AbortSignal;

	/** Progress callback for file uploads */
	onUploadProgress?: (event: AxiosProgressEvent) => void;
	/** Progress callback for file downloads */
	onDownloadProgress?: (event: AxiosProgressEvent) => void;
	/** Axios responseType override (e.g. 'blob' for downloads) */
	responseType?: AxiosRequestConfig["responseType"];
}

/**
 * Options for executing an endpoint request, allowing override of mocking,
 * delays, and cancellation per call.
 */
export interface ExecuteOptions {
	/**
	 * Whether to use mockData instead of performing a real HTTP request.
	 * If undefined, mocks are used only if mockData is defined in descriptor.
	 */
	mock?: boolean;
	/**
	 * Override delay (in ms) before sending real HTTP request.
	 */
	delayMs?: number;
	/**
	 * AbortSignal to cancel this specific request execution.
	 */
	signal?: AbortSignal;
}

/**
 * Extends AxiosRequestConfig to mark when a request has been retried.
 */
export interface RetriableRequestConfig extends AxiosRequestConfig {
	/** Internal flag indicating the request has already been retried */
	_retry?: boolean;
}

/**
 * Represents authentication tokens and their expiration time.
 */
export interface AuthPayload {
	/** Access token for authenticated requests */
	accessToken: string;
	/** Refresh token used to obtain new access tokens */
	refreshToken: string;
	/** Expiration timestamp (in seconds since UNIX epoch) */
	expiresAt: number;
}

/**
 * Configuration callbacks for setting up auth interceptors on an Axios instance.
 */
export interface AuthInterceptorConfig {
	/**
	 * Retrieve stored authentication payload (access & refresh tokens).
	 */
	getAuthPayload(): Promise<AuthPayload | null>;
	/**
	 * Persist updated authentication payload.
	 */
	setAuthPayload(payload: AuthPayload): Promise<void>;
	/**
	 * Clear stored authentication payload (logout).
	 */
	clearAuthPayload(): Promise<void>;
	/**
	 * Perform token refresh using existing tokens.
	 */
	refreshTokens(payload: AuthPayload): Promise<AuthPayload>;
	/**
	 * Apply the Authorization header (or other auth scheme) to the request.
	 */
	applyAuthHeader(request: RetriableRequestConfig, payload: AuthPayload): void;
}

/**
 * HTTP client wrapper supporting multiple base URLs, request interceptors,
 * and a fluent API for building endpoint requests.
 */
export class ApiClient {
	private readonly axiosInstance: AxiosInstance;
	private static readonly defaultInstance: AxiosInstance = axios.create();

	/**
	 * @param baseURL Base URL for all requests made by this client instance.
	 */
	constructor(baseURL: string) {
		this.axiosInstance = axios.create({ baseURL });
	}

	/**
	 * Attach custom interceptors to the underlying Axios instance.
	 * @param configurer Function that receives the Axios instance to configure.
	 */
	public addInterceptors(configurer: (instance: AxiosInstance) => void): void {
		configurer(this.axiosInstance);
	}

	/**
	 * Create a new EndpointBuilder using the provided descriptor.
	 * @template TResponse - Expected response data type
	 * @param descriptor EndpointDescriptor defining the request
	 */
	public endpoint<TResponse = any>(
		descriptor: EndpointDescriptor
	): EndpointBuilder<TResponse> {
		return new EndpointBuilder<TResponse>(
			descriptor,
			this.axiosInstance,
			ApiClient.defaultInstance
		);
	}

	/**
	 * Configure automatic token refresh and auth header application
	 * via request/response interceptors.
	 * @param cfg AuthInterceptorConfig with callback implementations
	 */
	public addAuthInterceptors(cfg: AuthInterceptorConfig): void {
		// Request interceptor: refresh expired tokens and apply auth header
		this.axiosInstance.interceptors.request.use(
			async (req) => {
				const auth = await cfg.getAuthPayload();
				if (!auth) return req;

				const now = Date.now() / 1000;
				let token = auth;

				try {

					// Refresh if expired
					if (auth.expiresAt <= now) {
						console.debug("Access token expired, refreshing...");
						token = await cfg.refreshTokens(auth);
						await cfg.setAuthPayload(token);
					}
					cfg.applyAuthHeader(req as RetriableRequestConfig, token);
				} catch (err) {
					console.error("Failed to refresh token", err);
					await cfg.clearAuthPayload();
				}

				return req;
			},
			(err: AxiosError) => Promise.reject(err)
		);

		// Response interceptor: on 401, attempt one retry after refreshing tokens
		this.axiosInstance.interceptors.response.use(
			(res) => res,
			async (error: AxiosError) => {
				const original = error.config as RetriableRequestConfig;
				if (error.response?.status === 401 && !original._retry) {
					original._retry = true;
					const auth = await cfg.getAuthPayload();
					if (auth) {
						try {
							console.debug("Refreshing token on 401 response...");
							const fresh = await cfg.refreshTokens(auth);
							await cfg.setAuthPayload(fresh);
							cfg.applyAuthHeader(original, fresh);
							return this.axiosInstance.request(original);
						} catch (err) {
							console.error("Failed to refresh token", err);
							await cfg.clearAuthPayload();
						}
					}
				}
				return Promise.reject(error);
			}
		);
	}
}

/**
 * Fluent builder for constructing and executing API requests with
 * support for mocking, delays, cancellation, and response projection.
 *
 * @template TResponse - Expected response data type
 */
export class EndpointBuilder<TResponse = any> {
	private readonly descriptor: EndpointDescriptor;
	private readonly axiosInstance: AxiosInstance;
	private readonly defaultInstance: AxiosInstance;
	private selectFn?: (data: any) => any;

	/**
	 * @param descriptor Descriptor containing endpoint configuration
	 * @param axiosInstance Axios instance to use for real HTTP calls
	 * @param defaultInstance Fallback Axios instance without interceptors
	 */
	constructor(
		descriptor: EndpointDescriptor,
		axiosInstance: AxiosInstance,
		defaultInstance: AxiosInstance
	) {
		this.descriptor = descriptor;
		this.axiosInstance = axiosInstance;
		this.defaultInstance = defaultInstance;
	}

	/**
	 * Attach query parameters to the request.
	 * @param params Key-value map of query parameters
	 */
	public params(params: Record<string, unknown>): this {
		this.descriptor.params = params;
		return this;
	}

	/**
	 * Attach a JSON body to the request.
	 * @param body Request payload object
	 */
	public body(body: Record<string, unknown>): this {
		this.descriptor.body = body;
		return this;
	}

	/**
	 * Attach custom headers to the request.
	 * @param headers Key-value map of HTTP headers
	 */
	public headers(headers: Record<string, string>): this {
		this.descriptor.headers = headers;
		return this;
	}

	/**
	 * Define static mock data to return in place of a real HTTP call.
	 * @param data Mock response payload
	 * @param delayMs Optional delay before returning mock data
	 */
	public mock(data: TResponse, delayMs?: number): this {
		this.descriptor.mockData = data;
		this.descriptor.mockDelayMs = delayMs;
		return this;
	}


	/**
	 * Define a default delay (in ms) before sending real HTTP requests.
	 * @param delayMs Delay duration in milliseconds
	 */
	public delay(delayMs: number): this {
		this.descriptor.defaultDelayMs = delayMs;
		return this;
	}

	/**
	 * Provide a selector to project or extract a subset of the response data.
	 * @template R - Type of the projected data
	 * @param selector Function that maps full response to desired shape
	 */
	public select<R>(selector: (data: TResponse) => R): EndpointBuilder<R> {
		const builder = new EndpointBuilder<R>(
			this.descriptor,
			this.axiosInstance,
			this.defaultInstance
		);
		builder.selectFn = selector;
		return builder;
	}

	/**
	 * Attach an AbortSignal to allow cancellation of the request.
	 * @param signal AbortSignal instance
	 */
	public abort(signal: AbortSignal): this {
		this.descriptor.abortSignal = signal;
		return this;
	}

	public onUploadProgress(callback: (evt: AxiosProgressEvent) => void): this {
		this.descriptor.onUploadProgress = callback;
		return this;
	}

	public onDownloadProgress(callback: (evt: AxiosProgressEvent) => void): this {
		this.descriptor.onDownloadProgress = callback;
		return this;
	}

	public responseType(type: AxiosRequestConfig["responseType"]): this {
		this.descriptor.responseType = type;
		return this;
	}

	public upload(fieldName: string, file: Blob | File | Buffer, extraData?: Record<string, any>): this {
		const form = new FormData();
		form.append(fieldName, file as Blob);
		if (extraData) Object.entries(extraData).forEach(([k, v]) => form.append(k, String(v)));
		this.descriptor.body = form as any;
		this.headers({ ...this.descriptor.headers, "Content-Type": "multipart/form-data" });
		return this;
	}

	/**
	 * Cross-platform download: fetches Blob/Buffer and returns it.
	 * In browser, optionally auto-saves if `autoSave` is true.
	 */
	/**
	 * Cross-platform download: fetches Blob/Buffer and returns it.
	 * In browser, optionally auto-saves if `autoSave` is true.
	 */
	public async download(options?: { filename?: string; autoSave?: boolean }): Promise<Blob | Buffer> {
		this.responseType("blob");
		// Force the execute result to Blob|Buffer via cast
		const data = await this.execute() as unknown as Blob | Buffer;
		if (options?.autoSave && typeof document !== "undefined") {
			const blob = data as Blob;
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = options.filename || "download";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}
		return data;
	}


	/**
	 * Execute the configured request, using mock data if requested,
	 * applying delays, cancellation, and projecting the response.
	 *
	 * @param options Execution-specific overrides (mock, delay, signal)
	 * @returns Either the mock or real response data, possibly transformed
	 */
	public async execute(options?: ExecuteOptions): Promise<TResponse> {
		const { mock, delayMs, signal } = options || {};
		const canMock = this.descriptor.mockData !== undefined;
		const shouldMock = mock !== undefined ? mock : canMock;

		// Return mock data if enabled
		if (shouldMock && canMock) {
			if (this.descriptor.mockDelayMs) await delay(this.descriptor.mockDelayMs);
			const mockData = this.descriptor.mockData as TResponse;
			return this.selectFn ? this.selectFn(mockData) : mockData;
		}

		// Choose appropriate Axios instance
		const instance = this.descriptor.ignoreInterceptors
			? this.defaultInstance
			: this.axiosInstance;

		// Determine cancellation signal
		const requestSignal = signal ?? this.descriptor.abortSignal;

		const config: AxiosRequestConfig = {
			method: this.descriptor.method,
			url: this.descriptor.route,
			params: this.descriptor.params,
			data: this.descriptor.body,
			headers: this.descriptor.headers,
			signal: requestSignal
		};

		try {
			// Apply any execution or default delay before sending
			const effectiveDelay = delayMs ?? this.descriptor.defaultDelayMs;
			if (effectiveDelay) await delay(effectiveDelay);

			// Perform HTTP request
			const response: AxiosResponse<TResponse> = await instance.request(config);
			const data = response.data;
			return this.selectFn ? this.selectFn(data) : data;
		} catch (error) {
			// Handle cancellation vs. other errors
			if ((error as any).name === "CanceledError" || (error as any).code === "ERR_CANCELED") {
				console.info(`Request canceled: ${this.descriptor.method} ${this.descriptor.route}`);
			} else {
				console.error(`Request failed: ${this.descriptor.method} ${this.descriptor.route}`, error as AxiosError);
			}
			throw error;
		}
	}
}


function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}