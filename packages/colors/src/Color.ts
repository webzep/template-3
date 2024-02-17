import { ColorUtility } from './ColorUtility';
const { fractionToHex, get, to, rgb, hsl } = ColorUtility;

export class Color {
	private _opacity = 1; // Opacity alone
	private _hsl = ''; // Hsl string without opacity
	private _hsla = ''; // Hsl string with opacity
	private _on: Color | null = null; // An appropriate "on" color for this color

	constructor(color: string) {
		this._setAll(color);

		return this;
	}

	/** Return if color has opacity. */
	get hasOpacity() {
		return this._opacity < 1;
	}

	// CONVERT
	/** Get color in HSL format without alpha. */
	get hsl() {
		return this._hsl;
	}
	/** Get color in HSLA format with any opacity. */
	get hsla() {
		return this._hsla;
	}
	/** Get color in RGB format. */
	get rgb() {
		return hsl.to.rgb(this.hsl);
	}
	/** Get color in RGBA format. */
	get rgba() {
		return hsl.to.rgb(this.hsla);
	}
	/** Get color in HEX format without alpha. */
	get hex() {
		return hsl.to.hex(this.hsl);
	}
	/** Get color in HEX format with any opacity. */
	get hexAlpha() {
		return hsl.to.hex(this.hsla);
	}

	// GET PROPERTIES

	/** Return the opacity in HEX representation. */
	get opacityAsHex() {
		return fractionToHex(this._opacity);
	}

	/** Get the red of the color. */
	get red() {
		return rgb.get.red(hsl.to.rgb(this.hsl));
	}

	/** Set the red value of the color [0,255]. */
	set red(red: number) {
		this.set(rgb.set.red(hsl.to.rgb(this.hsla), red));
	}

	/** Get the green of the color. */
	get green() {
		return rgb.get.green(hsl.to.rgb(this.hsl));
	}

	/** Set the green value of the color [0,255]. */
	set green(green: number) {
		this.set(rgb.set.green(hsl.to.rgb(this.hsla), green));
	}

	/** Get the blue of the color. */
	get blue() {
		return rgb.get.blue(hsl.to.rgb(this.hsl));
	}

	/** Set the blue value of the color [0,255]. */
	set blue(blue: number) {
		this.set(rgb.set.blue(hsl.to.rgb(this.hsla), blue));
	}

	/** Get the hue of the color. */
	get hue() {
		return hsl.get.hue(this.hsl);
	}

	/** Set the hue [0,360]. */
	set hue(hue: number) {
		this.set(hsl.set.hue(this.hsla, hue));
	}

	/** Get the saturation of the color. */
	get saturation() {
		return hsl.get.saturation(this.hsl);
	}

	/** Set the saturation [0,100]. */
	set saturation(saturation: number) {
		this.set(hsl.set.saturation(this.hsla, saturation));
	}

	/** Get the lightness of the color. */
	get lightness() {
		return hsl.get.lightness(this.hsl);
	}

	/** Set the lightness [0,100]. */
	set lightness(lightness: number) {
		this.set(hsl.set.lightness(this.hsla, lightness));
	}

	/** Get the opacity. */
	get opacity() {
		return this._opacity;
	}

	/** Set the opacity [0,1]. */
	set opacity(opacity: number) {
		this.set(hsl.set.opacity(this.hsla, opacity));
	}

	get on() {
		if (!this._on) {
			const onColor = get.onColor(this.hsl);
			this._on = new Color(onColor);
		}

		return this._on;
	}

	/** Manually set the on color. */
	set on(color: Color) {
		this._on = color;
	}

	/** Set all the class variables */
	private _setAll = (color: string) => {
		this._opacity = get.opacity(color);
		this._hsl = hsl.to.hsl(to.hsl(color));
		this._hsla = hsl.to.hsla(this._hsl, this._opacity);
	};

	/** Set the color from a string */
	public set(color: string) {
		this._setAll(color);

		return this;
	}

	/** Clone the color */
	public clone() {
		return new Color(this._hsl);
	}
}
