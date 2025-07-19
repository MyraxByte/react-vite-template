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
	 * Request timeout in milliseconds.
	 */
	timeout?: number;
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

	/** Retry configuration for this endpoint */
	retryConfig?: {
		attempts: number;
		delay: number;
		backoffMultiplier: number;
		retryOn: number[];
	};

	/** Request interceptor for this specific endpoint */
	requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
	/** Response interceptor for this specific endpoint */
	responseInterceptor?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
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
	/**
	 * Retry configuration for failed requests.
	 */
	retry?: {
		/** Number of retry attempts (default: 0) */
		attempts?: number;
		/** Delay between retries in ms (default: 1000) */
		delay?: number;
		/** Exponential backoff multiplier (default: 2) */
		backoffMultiplier?: number;
		/** HTTP status codes that should trigger a retry */
		retryOn?: number[];
	};
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
	private refreshPromise: Promise<AuthPayload> | null = null;

	/**
	 * @param baseURL Base URL for all requests made by this client instance.
	 */
	constructor(baseURL: string) {
		this.axiosInstance = axios.create({ baseURL });
	}

	/**
	 * Get the base URL for this client.
	 */
	public getBaseURL(): string | undefined {
		return this.axiosInstance.defaults.baseURL;
	}

	/**
	 * Create a full URL by combining base URL with route and params.
	 * @param route The route to append to base URL
	 * @param params Optional query parameters
	 */
	public buildURL(route: string, params?: Record<string, unknown>): string {
		const baseURL = this.getBaseURL() || "";
		const url = new URL(route, baseURL);

		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== null && value !== undefined) {
					if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
						url.searchParams.append(key, String(value));
					} else if (typeof value === "object") {
						url.searchParams.append(key, JSON.stringify(value));
					}
				}
			});
		}

		return url.toString();
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
	 * Create a GET request endpoint.
	 * @template TResponse - Expected response data type
	 * @param route URL or route for the endpoint
	 */
	public get<TResponse = any>(route: string): EndpointBuilder<TResponse> {
		return this.endpoint<TResponse>({ method: "GET", route });
	}

	/**
	 * Create a POST request endpoint.
	 * @template TResponse - Expected response data type
	 * @param route URL or route for the endpoint
	 */
	public post<TResponse = any>(route: string): EndpointBuilder<TResponse> {
		return this.endpoint<TResponse>({ method: "POST", route });
	}

	/**
	 * Create a PUT request endpoint.
	 * @template TResponse - Expected response data type
	 * @param route URL or route for the endpoint
	 */
	public put<TResponse = any>(route: string): EndpointBuilder<TResponse> {
		return this.endpoint<TResponse>({ method: "PUT", route });
	}

	/**
	 * Create a DELETE request endpoint.
	 * @template TResponse - Expected response data type
	 * @param route URL or route for the endpoint
	 */
	public delete<TResponse = any>(route: string): EndpointBuilder<TResponse> {
		return this.endpoint<TResponse>({ method: "DELETE", route });
	}

	/**
	 * Create a PATCH request endpoint.
	 * @template TResponse - Expected response data type
	 * @param route URL or route for the endpoint
	 */
	public patch<TResponse = any>(route: string): EndpointBuilder<TResponse> {
		return this.endpoint<TResponse>({ method: "PATCH", route });
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
						// Use existing promise if refresh is already in progress
						if (!this.refreshPromise) {
							if (typeof console !== "undefined" && console.debug) {
								console.debug("Access token expired, refreshing...");
							}
							this.refreshPromise = cfg.refreshTokens(auth).finally(() => {
								this.refreshPromise = null;
							});
						}
						token = await this.refreshPromise;
						await cfg.setAuthPayload(token);
					}
					cfg.applyAuthHeader(req as RetriableRequestConfig, token);
				} catch (err) {
					if (typeof console !== "undefined" && console.error) {
						console.error("Failed to refresh token", err);
					}
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
							if (typeof console !== "undefined" && console.debug) {
								console.debug("Refreshing token on 401 response...");
							}
							const fresh = await cfg.refreshTokens(auth);
							await cfg.setAuthPayload(fresh);
							cfg.applyAuthHeader(original, fresh);
							return this.axiosInstance.request(original);
						} catch (err) {
							if (typeof console !== "undefined" && console.error) {
								console.error("Failed to refresh token", err);
							}
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
	 * Append query parameters to existing ones.
	 * @param params Key-value map of query parameters to append
	 */
	public addParams(params: Record<string, unknown>): this {
		this.descriptor.params = { ...this.descriptor.params, ...params };
		return this;
	}

	/**
	 * Add a single query parameter.
	 * @param key Parameter name
	 * @param value Parameter value
	 */
	public param(key: string, value: unknown): this {
		this.descriptor.params = { ...this.descriptor.params, [key]: value };
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
	 * Attach a JSON body with automatic Content-Type header.
	 * @param data Request payload object
	 */
	public json(data: Record<string, unknown>): this {
		this.descriptor.body = data;
		this.headers({
			...this.descriptor.headers,
			"Content-Type": "application/json"
		});
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
		if (delayMs < 0) throw new Error("Delay must be non-negative");
		this.descriptor.defaultDelayMs = delayMs;
		return this;
	}

	/**
	 * Set request timeout in milliseconds.
	 * @param timeoutMs Timeout duration in milliseconds
	 */
	public timeout(timeoutMs: number): this {
		if (timeoutMs <= 0) throw new Error("Timeout must be positive");
		this.descriptor.timeout = timeoutMs;
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

	/**
	 * Configure retry behavior for this endpoint.
	 * @param attempts Number of retry attempts (default: 3)
	 * @param delayMs Base delay between retries in ms (default: 1000)
	 * @param backoffMultiplier Exponential backoff multiplier (default: 2)
	 * @param retryOn HTTP status codes that should trigger a retry
	 */
	public retry(
		attempts: number = 3,
		delayMs: number = 1000,
		backoffMultiplier: number = 2,
		retryOn: number[] = [408, 429, 500, 502, 503, 504]
	): this {
		if (attempts < 0) throw new Error("Retry attempts must be non-negative");
		if (delayMs < 0) throw new Error("Retry delay must be non-negative");
		if (backoffMultiplier < 1) throw new Error("Backoff multiplier must be >= 1");

		this.descriptor.retryConfig = {
			attempts,
			delay: delayMs,
			backoffMultiplier,
			retryOn
		};
		return this;
	}

	public upload(fieldName: string, file: Blob | File, extraData?: Record<string, any>): this {
		if (!file) throw new Error("File is required for upload");

		const form = new FormData();
		form.append(fieldName, file);
		if (extraData) {
			Object.entries(extraData).forEach(([k, v]) => {
				if (v !== null && v !== undefined) {
					form.append(k, String(v));
				}
			});
		}
		this.descriptor.body = form as any;
		// Don't set Content-Type header - let browser set it with boundary
		return this;
	}

	/**
	 * Create form data request with multiple fields.
	 * @param data Key-value pairs for form fields
	 */
	public form(data: Record<string, string | number | boolean | Blob | File>): this {
		const form = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				if (typeof value === "object" &&
					((typeof Blob !== "undefined" && value instanceof Blob) ||
					(typeof File !== "undefined" && value instanceof File))) {
					form.append(key, value as Blob);
				} else if (typeof value !== "object") {
					form.append(key, String(value));
				}
			}
		});
		this.descriptor.body = form as any;
		return this;
	}

	/**
	 * Add a request interceptor for this specific endpoint.
	 * @param interceptor Function to modify the request config before sending
	 */
	public onRequest(interceptor: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>): this {
		this.descriptor.requestInterceptor = interceptor;
		return this;
	}

	/**
	 * Add a response interceptor for this specific endpoint.
	 * @param interceptor Function to modify the response after receiving
	 */
	public onResponse(interceptor: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>): this {
		this.descriptor.responseInterceptor = interceptor;
		return this;
	}

	/**
	 * Enable request/response logging for debugging.
	 * @param enabled Whether to enable logging (default: true)
	 */
	public debug(enabled: boolean = true): this {
		if (enabled) {
			this.onRequest((config) => {
				if (typeof console !== "undefined" && console.log) {
					console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
						params: config.params,
						data: config.data,
						headers: config.headers
					});
				}
				return config;
			});

			this.onResponse((response) => {
				if (typeof console !== "undefined" && console.log) {
					console.log(`✅ ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
				}
				return response;
			});
		}
		return this;
	}

	/**
	 * Cross-platform download: fetches Blob and returns it.
	 * In browser, optionally auto-saves if `autoSave` is true.
	 */
	public async download(options?: { filename?: string; autoSave?: boolean }): Promise<Blob> {
		this.responseType("blob");
		// Force the execute result to Blob via cast
		const data = await this.execute() as unknown as Blob;
		if (options?.autoSave && typeof document !== "undefined") {
			const url = URL.createObjectURL(data);
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
	 * @param options Execution-specific overrides (mock, delay, signal, retry)
	 * @returns Either the mock or real response data, possibly transformed
	 */
	public async execute(options?: ExecuteOptions): Promise<TResponse> {
		const { mock, delayMs, signal, retry } = options || {};
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
			signal: requestSignal,
			onUploadProgress: this.descriptor.onUploadProgress,
			onDownloadProgress: this.descriptor.onDownloadProgress,
			responseType: this.descriptor.responseType,
			timeout: this.descriptor.timeout
		};

		const retryConfig = {
			attempts: retry?.attempts ?? this.descriptor.retryConfig?.attempts ?? 0,
			delay: retry?.delay ?? this.descriptor.retryConfig?.delay ?? 1000,
			backoffMultiplier: retry?.backoffMultiplier ?? this.descriptor.retryConfig?.backoffMultiplier ?? 2,
			retryOn: retry?.retryOn ?? this.descriptor.retryConfig?.retryOn ?? [408, 429, 500, 502, 503, 504]
		};

		let lastError: any;

		for (let attempt = 0; attempt <= retryConfig.attempts; attempt++) {
			try {
				// Apply any execution or default delay before sending
				const effectiveDelay = delayMs ?? this.descriptor.defaultDelayMs;
				if (effectiveDelay) await delay(effectiveDelay);

				// Apply request interceptor if defined
				let finalConfig = config;
				if (this.descriptor.requestInterceptor) {
					finalConfig = await this.descriptor.requestInterceptor(config);
				}

				// Perform HTTP request
				let response: AxiosResponse<TResponse> = await instance.request(finalConfig);

				// Apply response interceptor if defined
				if (this.descriptor.responseInterceptor) {
					response = await this.descriptor.responseInterceptor(response);
				}

				const data = response.data;
				return this.selectFn ? this.selectFn(data) : data;
			} catch (error) {
				lastError = error;

				// Handle cancellation immediately without retry
				if ((error as any).name === "CanceledError" || (error as any).code === "ERR_CANCELED") {
					if (typeof console !== "undefined" && console.info) {
						console.info(`Request canceled: ${this.descriptor.method} ${this.descriptor.route}`);
					}
					throw error;
				}

				// Check if this is a retryable error
				const axiosError = error as AxiosError;
				const isHttpError = axiosError.response?.status &&
					retryConfig.retryOn.includes(axiosError.response.status);
				const isNetworkError = !axiosError.response &&
					(axiosError.code === "ECONNRESET" ||
					 axiosError.code === "ETIMEDOUT" ||
					 axiosError.code === "ENOTFOUND" ||
					 axiosError.code === "ECONNREFUSED");

				const shouldRetry = attempt < retryConfig.attempts && (isHttpError || isNetworkError);

				if (!shouldRetry) {
					break;
				}

				// Wait before retry with exponential backoff
				const retryDelay = retryConfig.delay * Math.pow(retryConfig.backoffMultiplier, attempt);
				await delay(retryDelay);
			}
		}

		// Log final error
		if (typeof console !== "undefined" && console.error) {
			console.error(`Request failed: ${this.descriptor.method} ${this.descriptor.route}`, lastError as AxiosError);
		}
		throw lastError;
	}
}


function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}