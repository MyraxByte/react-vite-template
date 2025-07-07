/**
 * Color manipulation and conversion library.
 *
 * Provides methods for converting between color spaces (HEX, RGB, HSL),
 * calculating luminance and contrast ratios, and adjusting colors for better readability.
 */
export class Color {
	private r: number;
	private g: number;
	private b: number;

	/**
     * Creates a new Color instance.
     * @param r Red component (0-255).
     * @param g Green component (0-255).
     * @param b Blue component (0-255).
     */
	constructor(data: { r: number; g: number; b: number } | string) {
		if (typeof data === "string") {
			const color = Color.fromString(data);
			this.r = color.r;
			this.g = color.g;
			this.b = color.b;
		} else {
			this.r = Color.clampValue(data.r);
			this.g = Color.clampValue(data.g);
			this.b = Color.clampValue(data.b);
		}
	}

	setR(r: number) {
		this.r = Color.clampValue(r);
	}

	setG(g: number) {
		this.g = Color.clampValue(g);
	}

	setB(b: number) {
		this.b = Color.clampValue(b);
	}

	static fromImage(imageUrl: string): Promise<Color> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = "Anonymous";
			img.src = imageUrl;
			img.onload = () => {
				const canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				const context = canvas.getContext("2d");

				if (!context) {
					reject(new Error("Failed to get canvas context"));
					return;
				}

				context.drawImage(img, 0, 0);
				const imageData = context.getImageData(0, 0, img.width, img.height);
				const data = imageData.data;

				let r = 0;
				let g = 0;
				let b = 0;

				for (let i = 0; i < data.length; i += 4) {
					r += data[i];
					g += data[i + 1];
					b += data[i + 2];
				}

				const numPixels = data.length / 4;
				r = Math.round(r / numPixels);
				g = Math.round(g / numPixels);
				b = Math.round(b / numPixels);

				resolve(new Color({ r, g, b }));
			};
		});
	}

	static from(data: { r: number; g: number; b: number } | { h: number; s: number; l: number } | string) {
		if (typeof data === "string") {
			return Color.fromString(data);
		} else if ("r" in data) {
			return new Color(data);
		} else {
			return Color.fromHsl(data.h, data.s, data.l);
		}
	}

	/**
     * Clamps a value between 0 and 255 and rounds it to the nearest integer.
     * @param value The value to clamp.
     * @returns The clamped and rounded value.
     */
	private static clampValue(value: number): number {
		return Math.min(255, Math.max(0, Math.round(value)));
	}

	static fromString(color: string): Color {
		if (color.startsWith("#")) {
			return Color.fromHex(color);
		} else if (color.startsWith("rgb")) {
			const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/);
			if (match) {
				const r = parseInt(match[1]);
				const g = parseInt(match[2]);
				const b = parseInt(match[3]);
				return new Color({ r, g, b });
			}
		}
		throw new Error("Invalid color string");
	}

	/**
     * Creates a Color instance from a HEX string.
     * @param hex The HEX color string (e.g., '#FF0000' or 'FF0000').
     * @returns A new Color instance.
     */
	static fromHex(hex: string): Color {
		let sanitizedHex = hex.startsWith("#") ? hex.substring(1) : hex;

		if (sanitizedHex.length === 3) {
			sanitizedHex = sanitizedHex
				.split("")
				.map((c) => c + c)
				.join("");
		}

		const rgbValue = parseInt(sanitizedHex, 16);
		const r = (rgbValue >> 16) & 0xff;
		const g = (rgbValue >> 8) & 0xff;
		const b = rgbValue & 0xff;

		return new Color({ r, g, b });
	}

	/**
     * Creates a Color instance from HSL components.
     * @param h Hue component (0-1).
     * @param s Saturation component (0-1).
     * @param l Lightness component (0-1).
     * @returns A new Color instance.
     */
	static fromHsl(h: number, s: number, l: number): Color {
		const [r, g, b] = Color.hslToRgb(h, s, l);
		return new Color({ r, g, b });
	}

	static fromRgb(r: number, g: number, b: number): Color {
		return new Color({ r, g, b });
	}

	/**
     * Converts the Color instance to HSL components.
     * @returns An object containing h, s, and l components.
     */
	toHsl(): { h: number; s: number; l: number } {
		return Color.rgbToHsl(this.r, this.g, this.b);
	}

	/**
     * Converts the Color instance to a HEX string.
     * @returns The HEX color string.
     */
	toHex(alpha?: number): string {
		const rHex = this.r.toString(16).padStart(2, "0");
		const gHex = this.g.toString(16).padStart(2, "0");
		const bHex = this.b.toString(16).padStart(2, "0");
		const aHex =
            alpha !== undefined && alpha !== 1
            	? Math.round(alpha * 255)
            		.toString(16)
            		.padStart(2, "0")
            	: "";
		return `#${rHex}${gHex}${bHex}${aHex}`.toUpperCase();
	}

	/**
     * Converts the Color instance to an RGB or RGBA string.
     * @param alpha Optional alpha value (0-1) for RGBA.
     * @returns The RGB(A) color string.
     */
	toString(alpha?: number): string {
		if (alpha !== undefined) {
			return `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`;
		} else {
			return `rgb(${this.r}, ${this.g}, ${this.b})`;
		}
	}

	/**
     * Calculates the relative luminance of the color.
     * @returns The luminance value.
     */
	luminance(): number {
		const components = [this.r, this.g, this.b].map((v) => {
			v /= 255;
			return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
		});
		return components[0] * 0.2126 + components[1] * 0.7152 + components[2] * 0.0722;
	}

	/**
     * Calculates the contrast ratio between two colors.
     * @param color1 The first color.
     * @param color2 The second color.
     * @returns The contrast ratio.
     */
	static contrast(color1: Color, color2: Color): number {
		const lum1 = color1.luminance();
		const lum2 = color2.luminance();
		return lum1 > lum2 ? (lum1 + 0.05) / (lum2 + 0.05) : (lum2 + 0.05) / (lum1 + 0.05);
	}

	/**
     * Adjusts a color to achieve a desired contrast ratio against a background color.
     * @param foregroundHex The foreground color in HEX format.
     * @param backgroundHex The background color in HEX format.
     * @param desiredContrast The desired contrast ratio (default is 4.5).
     * @returns A new Color instance with adjusted brightness.
     */
	static getReadableColor(foregroundHex: string, backgroundHex: string = "#FFFFFF", desiredContrast: number = 4.5): Color {
		const foreground = Color.fromHex(foregroundHex);
		const background = Color.fromHex(backgroundHex);

		let contrast = Color.contrast(foreground, background);
		if (contrast >= desiredContrast) {
			return foreground;
		}

		const { h, s, l } = foreground.toHsl();
		let bestContrast = contrast;
		let bestColor = foreground;

		let iteration = 0;
		const maxIterations = 20;
		const delta = 0.02;

		const clampLightness = (value: number) => Math.max(0, Math.min(1, value));

		// Flags to control lightness adjustments
		let increaseLightness = true;
		let decreaseLightness = true;

		while (iteration < maxIterations && (increaseLightness || decreaseLightness)) {
			let adjustedL;

			// Attempt to increase lightness
			if (increaseLightness) {
				adjustedL = clampLightness(l + delta * (iteration + 1));
				if (adjustedL === 1) {
					increaseLightness = false; // Maximum lightness reached
				}

				const adjustedColor = Color.fromHsl(h, s, adjustedL);
				contrast = Color.contrast(adjustedColor, background);

				if (contrast > bestContrast) {
					bestContrast = contrast;
					bestColor = adjustedColor;
				}

				if (contrast >= desiredContrast) {
					return adjustedColor;
				}
			}

			// Attempt to decrease lightness
			if (decreaseLightness) {
				adjustedL = clampLightness(l - delta * (iteration + 1));
				if (adjustedL === 0) {
					decreaseLightness = false; // Minimum lightness reached
				}

				const adjustedColor = Color.fromHsl(h, s, adjustedL);
				contrast = Color.contrast(adjustedColor, background);

				if (contrast > bestContrast) {
					bestContrast = contrast;
					bestColor = adjustedColor;
				}

				if (contrast >= desiredContrast) {
					return adjustedColor;
				}
			}

			iteration++;
		}

		// Return the color with the best achieved contrast
		return bestColor;
	}

	/**
     * Generates a random Color instance.
     * @returns A new Color instance with random RGB values.
     */
	static random(): Color {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		return new Color({ r, g, b });
	}

	/**
     * Converts RGB components to HSL.
     * @param r Red component (0-255).
     * @param g Green component (0-255).
     * @param b Blue component (0-255).
     * @returns An object containing h, s, and l components.
     */
	private static rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
		r /= 255;
		g /= 255;
		b /= 255;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		let h = 0,
			s = 0;
		const l = (max + min) / 2;

		if (max !== min) {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}

		return { h, s, l };
	}

	/**
     * Converts HSL components to RGB.
     * @param h Hue component (0-1).
     * @param s Saturation component (0-1).
     * @param l Lightness component (0-1).
     * @returns An array containing r, g, and b components.
     */
	private static hslToRgb(h: number, s: number, l: number): [number, number, number] {
		let r = 0,
			g = 0,
			b = 0;

		if (s === 0) {
			r = g = b = l; // Achromatic
		} else {
			const hue2rgb = (p: number, q: number, t: number) => {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p + (q - p) * 6 * t;
				if (t < 1 / 2) return q;
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			};

			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;
			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}

		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}
}
