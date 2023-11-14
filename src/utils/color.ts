export default class Color {
    private hex: string;

    constructor(hex: string) {
        this.hex = hex;
    }

    static fromRgb(r: number, g: number, b: number) {
        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        return new Color(hex);
    }

    static from(string: string) {
        return new Color(string);
	}

    toRgb(alpha = 1) {
        const hex = this.hex.substring(1);
        const rgb = parseInt(hex, 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    static random() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
}
