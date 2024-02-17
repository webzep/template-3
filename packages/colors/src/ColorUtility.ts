const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(min, value), max);

export class ColorUtility {
	static rgb = {
		/** Reduce an RGB color to a predictable format.
		 * @example clean("rgb(158    62, 172 / 80%)")
		 * Output: 'rgb(158,62,172,0.8)'
		 */
		clean: (color: string) => {
			color = color.replace(/ /g, ',');
			color = color.replace(/\//g, ',');
			while (color.includes(',,')) color = color.replace(/,,/g, ',');

			const parts = color.split('(')[1].split(')')[0].split(',');
			while (parts.slice(-1)[0] === '') parts.pop();

			if (
				parts.length === 4 &&
				(parts[3].includes('%') || Number(parts[3]) > 1)
			) {
				parts[3] = String(Number(parts[3].replace('%', '')) / 100);
			}

			color = `rgb(${parts.join(',')})`;

			return color;
		},
		/** Format RGB parts into a RGB string.  */
		compose: (parts: (number | string)[]) => {
			if (parts.length < 3) {
				throw new Error(
					'ColorUtility.rgb.compose: Parts must have at least three values.'
				);
			}
			const p = parts.map((p) => String(p));

			if (p.length === 4 && (p[3].includes('%') || Number(p[3]) > 1)) {
				p[3] = String(Number(p[3].replace('%', '')) / 100);
			}

			return `rgb(${p.join(',')})`;
		},
		/** Decompose an RGB color into string values.
		 * @example decompose('rgb(40,40,40)')
		 * Outputs: ["40","40","40"]
		 */
		decompose: (color: string): string[] => {
			return ColorUtility.rgb
				.clean(color)
				.split('(')[1]
				.split(')')[0]
				.split(',');
		},
		/** Decompose an RGB color to numeric values.
		 * @example decomposeNumeric('rgb(40,40,40, 30%)')
		 * Outputs: [40,40,40,0.3]
		 */
		decomposeNumeric: (color: string): number[] => {
			return ColorUtility.rgb
				.clean(color)
				.split('(')[1]
				.replace(')', '')
				.split(',')
				.map((n) => Number(n));
		},
		get: {
			/** Get the blue value of an RGB color. */
			blue: (color: string) => {
				ColorUtility.rgb.validateWithError(color);

				return ColorUtility.rgb.decomposeNumeric(color)[2];
			},
			/** Get the green value of an RGB color. */
			green: (color: string) => {
				ColorUtility.rgb.validateWithError(color);

				return ColorUtility.rgb.decomposeNumeric(color)[1];
			},
			/** Get the opacity of an RGB color. */
			opacity: (color: string) => {
				ColorUtility.rgb.validateWithError(color);

				return ColorUtility.rgb.decomposeNumeric(color)[3] ?? 1;
			},
			/** Get the red value of an RGB color. */
			red: (color: string) => {
				ColorUtility.rgb.validateWithError(color);

				return ColorUtility.rgb.decomposeNumeric(color)[0];
			},
		},
		/** Check if there is an opacity value in an RGB color. */
		isRgba: (color: string) => {
			return ColorUtility.rgb.decompose(color).length === 4;
		},
		/** Check if a string is an RGB color. */
		isValid: (color: string) => {
			return (
				color.slice(0, 3) === 'rgb' &&
				ColorUtility.rgb.decomposeNumeric(color).length > 2
			);
		},
		set: {
			/** Set the blue of an RGB color. */
			blue: (color: string, blue: number) => {
				ColorUtility.rgb.validateWithError(color);
				const parts = ColorUtility.rgb.decomposeNumeric(color);
				parts[2] = clamp(blue, 0, 255);

				return ColorUtility.rgb.compose(parts);
			},
			/** Set the green of an RGB color. */
			green: (color: string, green: number) => {
				ColorUtility.rgb.validateWithError(color);
				const parts = ColorUtility.rgb.decomposeNumeric(color);
				parts[1] = clamp(green, 0, 255);

				return ColorUtility.rgb.compose(parts);
			},
			/** Set the opacity value of a RGB color. */
			opacity: (color: string, opacity: number) => {
				const parts = ColorUtility.rgb.decomposeNumeric(color);
				if (opacity > 1) opacity = opacity / 100;
				parts[3] = clamp(opacity, 0, 1);

				return ColorUtility.rgb.compose(parts);
			},
			/** Set the red of an RGB color. */
			red: (color: string, red: number) => {
				ColorUtility.rgb.validateWithError(color);
				const parts = ColorUtility.rgb.decomposeNumeric(color);
				parts[0] = clamp(red, 0, 255);

				return ColorUtility.rgb.compose(parts);
			},
		},
		to: {
			/** Convert an RGB color to HEX. */
			hex: (color: string) => {
				if (ColorUtility.hex.isValid(color)) return color;
				const parts = ColorUtility.rgb.decomposeNumeric(color);
				if (parts.length === 4) parts[3] = (parts[3] / 1) * 255;

				return `#${parts.map((x) => (+x).toString(16).padStart(2, '0')).join('')}`;
			},
			/** Convert an RGB color to HSL. */
			hsl: (color: string) => {
				const [_r, _g, _b] = ColorUtility.rgb.decomposeNumeric(color);
				const r = _r / 255;
				const g = _g / 255;
				const b = _b / 255;
				const max = Math.max(r, g, b);
				const min = Math.min(r, g, b);
				let h, s;
				let l = (max + min) / 2;

				if (max === min) {
					h = s = 0;
				} else {
					const d = max - min;
					s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

					if (max === r) {
						h = (g - b) / d + (g < b ? 6 : 0);
					} else if (max === g) {
						h = (b - r) / d + 2;
					} else if (max === b) {
						h = (r - g) / d + 4;
					}

					if (h !== undefined) {
						h /= 6;
					}
				}
				if (h === undefined) {
					return '';
				}

				h = Math.round(h * 360);
				s = Math.round(s * 100);
				l = Math.round(l * 100);
				const a = ColorUtility.rgb.get.opacity(color);

				return `hsl(${h}deg,${s}%,${l}%${a === 1 ? '' : ',' + a})`;
			},
		},
		/** Check if a string is an RGB color, throw an error if not. */
		validateWithError: (color: string) => {
			if (!ColorUtility.rgb.isValid(color))
				throw new Error(
					'ColorUtility.rgb.validateWithError: Color must be RGB.'
				);
		},
	};

	static hsl = {
		/** Reduce an HSL color to a predictable format.
		 * @example cleanHsl("hsl(358deg    62%, 52% / 80%)")
		 *	Output: 'hsl(358deg,62%,52%,0.8)'
		 */
		clean: (color: string) => {
			color = color.replace(/ /g, ',');
			color = color.replace(/\//g, ',');
			while (color.includes(',,')) color = color.replace(/,,/g, ',');

			const parts = color.split('(')[1].split(')')[0].split(',');
			while (parts.slice(-1)[0] === '') parts.pop();

			parts[0] = parts[0].includes('deg') ? parts[0] : parts[0] + 'deg';
			parts[1] = parts[1].includes('%') ? parts[1] : parts[1] + '%';
			parts[2] = parts[2].includes('%') ? parts[2] : parts[2] + '%';
			if (
				parts.length === 4 &&
				(parts[3].includes('%') || Number(parts[3]) > 1)
			) {
				parts[3] = String(Number(parts[3].replace('%', '')) / 100);
			}

			color = `hsl(${parts.join(',')})`;

			return color;
		},
		/** Format HSL parts into a HSL string.  */
		compose: (parts: (number | string)[]) => {
			if (parts.length < 3) {
				throw new Error(
					'ColorUtility.hsl.compose: Parts must have at least three values.'
				);
			}
			const p = parts.map((p) => String(p));
			p[0] = p[0].includes('deg') ? p[0] : p[0] + 'deg';
			p[1] = p[1].includes('%') ? p[1] : p[1] + '%';
			p[2] = p[2].includes('%') ? p[2] : p[2] + '%';

			if (p.length === 4 && (p[3].includes('%') || Number(p[3]) > 1)) {
				p[3] = String(Number(p[3].replace('%', '')) / 100);
			}

			return `hsl(${p.join(',')})`;
		},
		/** Decompose an HSL color into string values.
		 * @example decompose('hsl(40deg,40%,40,10)')
		 * Outputs: ["40deg","40%","40","10"]
		 */
		decompose: (color: string): string[] => {
			return ColorUtility.hsl
				.clean(color)
				.split('(')[1]
				.split(')')[0]
				.split(',');
		},
		/** Decompose an HSL color to numeric values.
		 * @example decomposeNumeric('hsl(40deg,40%,40%, 30%)')
		 * Outputs: [40,40,40,0.3]
		 */
		decomposeNumeric: (color: string): number[] => {
			return ColorUtility.hsl
				.clean(color)
				.replace('deg', '')
				.replace(/%/g, '')
				.split('(')[1]
				.replace(')', '')
				.split(',')
				.map((n) => Number(n));
		},
		get: {
			/** Get the hue of an HSL color. */
			hue: (color: string) => {
				ColorUtility.hsl.validateWithError(color);

				return ColorUtility.hsl.decomposeNumeric(color)[0];
			},
			/** Get the lightness of an HSL color. */
			lightness: (color: string) => {
				ColorUtility.hsl.validateWithError(color);

				return ColorUtility.hsl.decomposeNumeric(color)[2];
			},
			/** Get the opacity of an HSL color. */
			opacity: (color: string) => {
				ColorUtility.hsl.validateWithError(color);

				return ColorUtility.hsl.decomposeNumeric(color)[3] ?? 1;
			},
			/** Get the saturation of an HSL color. */
			saturation: (color: string) => {
				ColorUtility.hsl.validateWithError(color);

				return ColorUtility.hsl.decomposeNumeric(color)[1];
			},
		},
		/** Check if there is an opacity value in an HSL color. */
		isHsla: (color: string) => {
			return ColorUtility.hsl.decompose(color).length === 4;
		},
		/** Check if a string is an HSL color. */
		isValid: (color: string) => {
			return (
				color.slice(0, 3) === 'hsl' &&
				ColorUtility.rgb.decompose(color).length > 2
			);
		},
		set: {
			/** Set the hue of an HSL color. */
			hue: (color: string, hue: number) => {
				ColorUtility.hsl.validateWithError(color);
				const parts = ColorUtility.hsl.decomposeNumeric(color);

				// Clamp to [0,360]
				while (hue < 0) hue += 360;
				while (hue >= 360) hue -= 360;
				parts[0] = hue;

				return ColorUtility.hsl.compose(parts);
			},
			/** Set the lightness of an HSL color. */
			lightness: (color: string, lightness: number) => {
				ColorUtility.hsl.validateWithError(color);
				const parts = ColorUtility.hsl.decomposeNumeric(color);
				parts[2] = clamp(lightness, 0, 100);

				return ColorUtility.hsl.compose(parts);
			},
			/** Set the opacity value of a HSL color. */
			opacity: (color: string, opacity: number) => {
				const parts = ColorUtility.hsl.decomposeNumeric(color);
				if (opacity > 1) opacity = opacity / 100;
				parts[3] = clamp(opacity, 0, 1);

				return ColorUtility.hsl.compose(parts);
			},
			/** Set the saturation of an HSL color. */
			saturation: (color: string, saturation: number) => {
				ColorUtility.hsl.validateWithError(color);
				const parts = ColorUtility.hsl.decomposeNumeric(color);
				parts[1] = clamp(saturation, 0, 100);

				return ColorUtility.hsl.compose(parts);
			},
		},
		to: {
			/** Convert an HSL color to HEX. */
			hex: (color: string) => {
				const parts = ColorUtility.hsl.decompose(
					ColorUtility.hsl.clean(color)
				);
				const h = Number(parts[0].replace('deg', ''));
				const s = Number(parts[1].replace('%', ''));
				const l = Number(parts[2].replace('%', ''));

				const light = l / 100;
				const j = (s * Math.min(light, 1 - light)) / 100;
				const f = (n: number) => {
					const k = (n + h / 30) % 12;
					const color =
						light - j * Math.max(Math.min(k - 3, 9 - k, 1), -1);

					return Math.round(255 * color)
						.toString(16)
						.padStart(2, '0');
				};
				const a = Math.round(
					(ColorUtility.hsl.get.opacity(color) / 1) * 255
				);
				const aHex = a.toString(16).padStart(2, '0');

				return `#${f(0)}${f(8)}${f(4)}${a === 255 ? '' : aHex}`;
			},
			/** Convert HSL to HSL (remove any opacity). */
			hsl: (color: string) => {
				const parts = ColorUtility.hsl.decompose(color);
				if (parts.length > 3) parts.pop();

				return ColorUtility.hsl.compose(parts);
			},
			/** Convert HSL to HSLA. Opacity must be [0,1]. */
			hsla: (color: string, opacity: number) => {
				const parts = ColorUtility.hsl.decompose(color);
				parts[3] = String(opacity);

				return ColorUtility.hsl.compose(parts);
			},
			/** Convert HSL color to RGB. */
			rgb: (color: string) => {
				if (ColorUtility.rgb.isValid(color)) return color;
				const hex = ColorUtility.hsl.to.hex(color);

				return ColorUtility.hex.to.rgb(hex);
			},
		},
		/** Check if a string is an HSL color, throw an error if not. */
		validateWithError: (color: string) => {
			if (!ColorUtility.hsl.isValid(color))
				throw new Error(
					'ColorUtility.hsl.validateWithError: Color must be HSL.'
				);
		},
	};

	static hex = {
		/** Pad a 4 or 5 character HEX string to a 7 or 9 character HEX string. */
		clean: (color: string) => {
			if (!ColorUtility.hex.isValid(color))
				throw new Error(
					"ColorUtility.hex.clean: Can't clean a non-hex color"
				);

			if ([7, 9].includes(color.length)) return color;

			const values = color.split('');
			values.splice(1, 0, values[1]);
			values.splice(3, 0, values[3]);
			values.splice(5, 0, values[5]);
			if (values.length === 8) values.splice(7, 0, values[7]);

			return values.join('');
		},
		/** Format HEX parts into a HEX string.
		 * @example hex.compose(["a","b","c","e"]) // or ["AA","b","cc","e"]
		 * Output: #aabbccee
		 */
		compose: (parts: string[]) => {
			if (parts.length < 3) {
				throw new Error(
					'ColorUtility.hex.compose: Parts must have at least three values.'
				);
			}
			const p = parts.map((v) =>
				(v.length > 1 ? v : `${v}${v}`).toLowerCase()
			);

			return `#${p.join('')}`;
		},
		/** Check if there is an opacity value in a HEX color. */
		containsAlphaDesignation: (color: string) => {
			return ColorUtility.hex.clean(color).length === 9;
		},
		/** Decompose a HEX color to an array of strings
		 * @example decompose("#AABBCCDD")
		 * Output: ["aa","bb","cc","dd"]
		 */
		decompose: (color: string) => {
			ColorUtility.hex.validateWithError(color);

			const chars = ColorUtility.hex
				.clean(color)
				.replace('#', '')
				.split('');
			const parts = [];
			for (let i = 1; i < chars.length; i += 2) {
				parts.push(`${chars[i - 1]}${chars[i]}`.toLowerCase());
			}

			return parts;
		},
		get: {
			/** Get the blue value of a HEX color. [0,255]*/
			blueAsNumber: (color: string) => {
				ColorUtility.hex.validateWithError(color);
				const blue = ColorUtility.hex.get.blueAsString(color);

				return ColorUtility.hex.to.number(blue);
			},
			/** Get the blue string value of a HEX color. */
			blueAsString: (color: string) => {
				ColorUtility.hex.validateWithError(color);

				return ColorUtility.hex.decompose(color)[2];
			},
			/** Get the green value of a HEX color. [0,255]*/
			greenAsNumber: (color: string) => {
				ColorUtility.hex.validateWithError(color);
				const green = ColorUtility.hex.get.greenAsString(color);

				return ColorUtility.hex.to.number(green);
			},
			/** Get the green string value of a HEX color. */
			greenAsString: (color: string) => {
				ColorUtility.hex.validateWithError(color);

				return ColorUtility.hex.decompose(color)[1];
			},
			/** Get the opacity value of a HEX color. [0,1]*/
			opacityAsNumber: (color: string) => {
				ColorUtility.hex.validateWithError(color);
				const opacity = ColorUtility.hex.get.opacityAsString(color);

				return Number(
					(ColorUtility.hex.to.number(opacity) / 255).toFixed(2)
				);
			},
			/** Get the opacity string of a HEX color. */
			opacityAsString: (color: string) => {
				ColorUtility.hex.validateWithError(color);
				const parts = ColorUtility.hex.decompose(color);

				return parts.length === 4 ? parts[3] : 'ff';
			},
			/** Get the red value of a HEX color. [0,255]*/
			redAsNumber: (color: string) => {
				ColorUtility.hex.validateWithError(color);
				const red = ColorUtility.hex.get.redAsString(color);

				return ColorUtility.hex.to.number(red);
			},
			/** Get the red string value of a HEX color. */
			redAsString: (color: string) => {
				ColorUtility.hex.validateWithError(color);

				return ColorUtility.hex.decompose(color)[0];
			},
		},
		/** Check if a string is a HEX color. */
		isValid: (color: string) => {
			return color[0] === '#' && [4, 5, 7, 9].includes(color.length);
		},
		set: {
			/** Set the blue of a HEX color. */
			blue: (color: string, blue: string) => {
				ColorUtility.hex.validateWithError(color);
				const parts = ColorUtility.hex.decompose(color);
				parts[2] = blue;

				return ColorUtility.hex.compose(parts);
			},
			/** Set the green of a HEX color. */
			green: (color: string, green: string) => {
				ColorUtility.hex.validateWithError(color);
				const parts = ColorUtility.hex.decompose(color);
				parts[1] = green;

				return ColorUtility.hex.compose(parts);
			},
			/** Set the opacity value of a HEX color. */
			opacity: (color: string, opacity: string) => {
				const parts = ColorUtility.hex.decompose(color);
				parts[3] = opacity;

				return ColorUtility.hex.compose(parts);
			},
			/** Set the red of a HEX color. */
			red: (color: string, red: string) => {
				ColorUtility.hex.validateWithError(color);
				const parts = ColorUtility.hex.decompose(color);
				parts[0] = red;

				return ColorUtility.hex.compose(parts);
			},
		},
		to: {
			/** Convert HEX color to HSL */
			hsl: (hex: string) => {
				if (ColorUtility.hsl.isValid(hex)) return hex;
				const rgb = ColorUtility.hex.to.rgb(hex);
				const parts = ColorUtility.rgb.decomposeNumeric(rgb);
				let hsl = ColorUtility.rgb.to.hsl(rgb);
				if (parts.length === 3) hsl = hsl.replace(',1)', ')');

				return hsl;
			},
			/** Convert a HEX string to a number.
			 * @example to.number("#FF") // or "FF", "#88A" etc
			 * Output: 255
			 */
			number: (hex: string) => {
				return parseInt(hex.replace('#', ''), 16);
			},
			/** Convert HEX color to RGB */
			rgb: (hex: string) => {
				if (ColorUtility.rgb.isValid(hex)) return hex;
				const f = ColorUtility.hex.to.number;
				const parts = ColorUtility.hex.decompose(hex).map(f);
				if (parts.length > 3)
					parts[3] = Number((parts[3] / 255).toFixed(2));

				return `rgb(${parts.join(',')})`;
			},
		},
		/** Check if a string is a HEX color, throw an error if not. */
		validateWithError: (color: string) => {
			if (!ColorUtility.hex.isValid(color))
				throw new Error(
					'ColorUtility.hex.validateWithError: Color must be HEX.'
				);
		},
	};

	static css = {
		/** Check if a color is an CSS color */
		isValid: (color: string) => {
			return Object.keys(cssColorMap).includes(color);
		},
		to: {
			/** Convert an CSS color to HEX. */
			hex: (color: string) => {
				ColorUtility.css.validateWithError(color);

				return cssColorMap[color as keyof typeof cssColorMap];
			},
			/** Convert an CSS color to HSL. */
			hsl: (color: string) => {
				ColorUtility.css.validateWithError(color);

				return ColorUtility.hex.to.hsl(
					cssColorMap[color as keyof typeof cssColorMap]
				);
			},
			/** Convert an CSS color to RGB. */
			rgb: (color: string) => {
				ColorUtility.css.validateWithError(color);

				return ColorUtility.hex.to.rgb(
					cssColorMap[color as keyof typeof cssColorMap]
				);
			},
		},
		/** Check if a string is an CSS color, throw an error if not. */
		validateWithError: (color: string) => {
			if (!ColorUtility.css.isValid(color))
				throw new Error(
					'ColorUtility.css.validateWithError: Color must be an CSS color.'
				);
		},
	};

	static get = {
		/** Get the blue of a color. */
		blue: (color: string) => {
			if (ColorUtility.hex.isValid(color))
				return ColorUtility.hex.get.blueAsNumber(color);
			else if (ColorUtility.rgb.isValid(color))
				return ColorUtility.rgb.get.blue(color);
			else if (ColorUtility.hsl.isValid(color))
				return ColorUtility.rgb.get.blue(
					ColorUtility.hsl.to.rgb(color)
				);
			else if (ColorUtility.css.isValid(color))
				return ColorUtility.rgb.get.blue(
					ColorUtility.css.to.rgb(color)
				);

			throw new Error(
				'ColorUtility.get.blue: Only hex, rgb, hsl and css colors are supported.'
			);
		},
		/** Calculates the contrast ratio between two colors.
		 *
		 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
		 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb, rgba, hsl, hsla
		 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb, rgba, hsl, hsla
		 * @returns {number} A contrast ratio value in the range 0 - 21.
		 */
		contrast: (foreground: string, background: string): number => {
			const lumF = ColorUtility.get.luminance(foreground);
			const lumB = ColorUtility.get.luminance(background);

			return (
				(Math.max(lumF, lumB) + 0.05) / (Math.min(lumF, lumB) + 0.05)
			);
		},
		/** Get the green of a color. */
		green: (color: string) => {
			if (ColorUtility.hex.isValid(color))
				return ColorUtility.hex.get.greenAsNumber(color);
			else if (ColorUtility.rgb.isValid(color))
				return ColorUtility.rgb.get.green(color);
			else if (ColorUtility.hsl.isValid(color))
				return ColorUtility.rgb.get.green(
					ColorUtility.hsl.to.rgb(color)
				);
			else if (ColorUtility.css.isValid(color))
				return ColorUtility.rgb.get.green(
					ColorUtility.css.to.rgb(color)
				);

			throw new Error(
				'ColorUtility.get.green: Only hex, rgb, hsl and css colors are supported.'
			);
		},
		/** Get the hue of a color. */
		hue: (color: string) => {
			if (ColorUtility.hex.isValid(color))
				return ColorUtility.hsl.get.hue(ColorUtility.hex.to.hsl(color));
			else if (ColorUtility.rgb.isValid(color))
				return ColorUtility.hsl.get.hue(ColorUtility.rgb.to.hsl(color));
			else if (ColorUtility.hsl.isValid(color))
				return ColorUtility.hsl.get.hue(color);
			else if (ColorUtility.css.isValid(color))
				return ColorUtility.hsl.get.hue(ColorUtility.css.to.hsl(color));

			throw new Error(
				'ColorUtility.get.hue: Only hex, rgb, hsl and css colors are supported.'
			);
		},
		/** Get the lightness of a color. */
		lightness: (color: string) => {
			if (ColorUtility.hex.isValid(color))
				return ColorUtility.hsl.get.lightness(
					ColorUtility.hex.to.hsl(color)
				);
			else if (ColorUtility.rgb.isValid(color))
				return ColorUtility.hsl.get.lightness(
					ColorUtility.rgb.to.hsl(color)
				);
			else if (ColorUtility.hsl.isValid(color))
				return ColorUtility.hsl.get.lightness(color);
			else if (ColorUtility.css.isValid(color))
				return ColorUtility.hsl.get.lightness(
					ColorUtility.css.to.hsl(color)
				);

			throw new Error(
				'ColorUtility.get.lightness: Only hex, rgb, hsl and css colors are supported.'
			);
		},
		/** Calculate the luminance of a color.w */
		luminance: (color: string) => {
			const { rgb, to } = ColorUtility;
			const parts = rgb.decomposeNumeric(to.rgb(color));
			const vals = parts.map((v) => {
				v /= 255;

				return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
			});

			const lum = 0.2126 * vals[0] + 0.7152 * vals[1] + 0.0722 * vals[2];

			return Number(lum.toFixed(3));
		},
		/** Calculate a suitable on color */
		onColor: (color: string) => {
			const { hsl, get, to } = ColorUtility;
			const _hsl = to.hsl(color);
			const color10 = hsl.to.hex(hsl.set.lightness(_hsl, 10));
			const color90 = hsl.to.hex(hsl.set.lightness(_hsl, 90));

			const color10Contrast = get.contrast(color, color10);
			const color90Contrast = get.contrast(color, color90);

			return color90Contrast > color10Contrast ? color90 : color10;
		},
		/** Get the opacity of a color. */
		opacity: (color: string) => {
			if (ColorUtility.hex.isValid(color))
				return ColorUtility.hex.get.opacityAsNumber(color);
			else if (ColorUtility.rgb.isValid(color))
				return ColorUtility.rgb.get.opacity(color);
			else if (ColorUtility.hsl.isValid(color))
				return ColorUtility.hsl.get.opacity(color);
			else if (ColorUtility.css.isValid(color)) return 1;
			throw new Error(
				'ColorUtility.get.opacity: Only hex, rgb, hsl and css colors are supported.'
			);
		},
		/** Get the red of a color. */
		red: (color: string) => {
			if (ColorUtility.hex.isValid(color))
				return ColorUtility.hex.get.redAsNumber(color);
			else if (ColorUtility.rgb.isValid(color))
				return ColorUtility.rgb.get.red(color);
			else if (ColorUtility.hsl.isValid(color))
				return ColorUtility.rgb.get.red(ColorUtility.hsl.to.rgb(color));
			else if (ColorUtility.css.isValid(color))
				return ColorUtility.rgb.get.red(ColorUtility.css.to.rgb(color));

			throw new Error(
				'ColorUtility.get.red: Only hex, rgb, hsl and css colors are supported.'
			);
		},
		/** Get the saturation of a color. */
		saturation: (color: string) => {
			if (ColorUtility.hex.isValid(color))
				return ColorUtility.hsl.get.saturation(
					ColorUtility.hex.to.hsl(color)
				);
			else if (ColorUtility.rgb.isValid(color))
				return ColorUtility.hsl.get.saturation(
					ColorUtility.rgb.to.hsl(color)
				);
			else if (ColorUtility.hsl.isValid(color))
				return ColorUtility.hsl.get.saturation(color);
			else if (ColorUtility.css.isValid(color))
				return ColorUtility.hsl.get.saturation(
					ColorUtility.css.to.hsl(color)
				);

			throw new Error(
				'ColorUtility.get.saturation: Only hex, rgb, hsl and css colors are supported.'
			);
		},
	};

	static to = {
		/** Convert supported color to HEX representation. */
		hex: (color: string) => {
			if (ColorUtility.hex.isValid(color)) {
				return ColorUtility.hex.clean(color);
			} else if (ColorUtility.rgb.isValid(color)) {
				return ColorUtility.rgb.to.hex(color);
			} else if (ColorUtility.hsl.isValid(color)) {
				return ColorUtility.hsl.to.hex(color);
			} else if (ColorUtility.css.isValid(color)) {
				return ColorUtility.css.to.hex(color);
			} else {
				throw new Error(
					'ColorUtility.to.hex: Only hex, rgb, hsl and css colors are supported.'
				);
			}
		},
		/** Convert supported color to HSL representation. */
		hsl: (color: string) => {
			if (ColorUtility.hsl.isValid(color)) {
				return ColorUtility.hsl.clean(color);
			} else if (ColorUtility.hex.isValid(color)) {
				return ColorUtility.hex.to.hsl(color);
			} else if (ColorUtility.rgb.isValid(color)) {
				return ColorUtility.rgb.to.hsl(color);
			} else if (ColorUtility.css.isValid(color)) {
				return ColorUtility.css.to.hsl(color);
			} else {
				throw new Error(
					'ColorUtility.to.hsl: Only hex, rgb, hsl and css colors are supported.'
				);
			}
		},
		/** Convert supported color to RGB representation. */
		rgb: (color: string) => {
			if (ColorUtility.rgb.isValid(color)) {
				return ColorUtility.rgb.clean(color);
			} else if (ColorUtility.hex.isValid(color)) {
				return ColorUtility.hex.to.rgb(color);
			} else if (ColorUtility.hsl.isValid(color)) {
				return ColorUtility.hsl.to.rgb(color);
			} else if (ColorUtility.css.isValid(color)) {
				return ColorUtility.css.to.rgb(color);
			} else {
				throw new Error(
					'ColorUtility.to.rgb: Only hex, rgb, hsl and css colors are supported.'
				);
			}
		},
	};

	/** Convert opacity to hex.
	 * @example fractionToHex(1)
	 * Output: ff
	 */
	static fractionToHex = (n: number) => {
		const clamp = Math.min(Math.max(0, n), 1) * 255;

		return Math.round(clamp).toString(16).padStart(2, '0');
	};

	/** Convert number to hex string.
	 * @example numberToHex(255)
	 * Output: ff
	 */
	static numberToHex = (n: number) => {
		const clamp = Math.min(Math.max(0, n), 255);

		return Math.round(clamp).toString(16).padStart(2, '0');
	};
}

export const cssColorMap = {
	aliceblue: '#f0f8ff',
	antiquewhite: '#faebd7',
	aqua: '#00ffff',
	aquamarine: '#7fffd4',
	azure: '#f0ffff',
	beige: '#f5f5dc',
	bisque: '#ffe4c4',
	black: '#000000',
	blanchedalmond: '#ffebcd',
	blue: '#0000ff',
	blueviolet: '#8a2be2',
	brown: '#a52a2a',
	burlywood: '#deb887',
	cadetblue: '#5f9ea0',
	chartreuse: '#7fff00',
	chocolate: '#d2691e',
	coral: '#ff7f50',
	cornflowerblue: '#6495ed',
	cornsilk: '#fff8dc',
	crimson: '#dc143c',
	cyan: '#00ffff',
	darkblue: '#00008b',
	darkcyan: '#008b8b',
	darkgoldenrod: '#b8860b',
	darkgray: '#a9a9a9',
	darkgreen: '#006400',
	darkgrey: '#a9a9a9',
	darkkhaki: '#bdb76b',
	darkmagenta: '#8b008b',
	darkolivegreen: '#556b2f',
	darkorange: '#ff8c00',
	darkorchid: '#9932cc',
	darkred: '#8b0000',
	darksalmon: '#e9967a',
	darkseagreen: '#8fbc8f',
	darkslateblue: '#483d8b',
	darkslategray: '#2f4f4f',
	darkslategrey: '#2f4f4f',
	darkturquoise: '#00ced1',
	darkviolet: '#9400d3',
	deeppink: '#ff1493',
	deepskyblue: '#00bfff',
	dimgray: '#696969',
	dimgrey: '#696969',
	dodgerblue: '#1e90ff',
	firebrick: '#b22222',
	floralwhite: '#fffaf0',
	forestgreen: '#228b22',
	fuchsia: '#ff00ff',
	gainsboro: '#dcdcdc',
	ghostwhite: '#f8f8ff',
	gold: '#ffd700',
	goldenrod: '#daa520',
	gray: '#808080',
	green: '#008000',
	greenyellow: '#adff2f',
	grey: '#808080',
	honeydew: '#f0fff0',
	hotpink: '#ff69b4',
	indianred: '#cd5c5c',
	indigo: '#4b0082',
	ivory: '#fffff0',
	khaki: '#f0e68c',
	lavender: '#e6e6fa',
	lavenderblush: '#fff0f5',
	lawngreen: '#7cfc00',
	lemonchiffon: '#fffacd',
	lightblue: '#add8e6',
	lightcoral: '#f08080',
	lightcyan: '#e0ffff',
	lightgoldenrodyellow: '#fafad2',
	lightgray: '#d3d3d3',
	lightgreen: '#90ee90',
	lightgrey: '#d3d3d3',
	lightpink: '#ffb6c1',
	lightsalmon: '#ffa07a',
	lightseagreen: '#20b2aa',
	lightskyblue: '#87cefa',
	lightslategray: '#778899',
	lightslategrey: '#778899',
	lightsteelblue: '#b0c4de',
	lightyellow: '#ffffe0',
	lime: '#00ff00',
	limegreen: '#32cd32',
	linen: '#faf0e6',
	magenta: '#ff00ff',
	maroon: '#800000',
	mediumaquamarine: '#66cdaa',
	mediumblue: '#0000cd',
	mediumorchid: '#ba55d3',
	mediumpurple: '#9370db',
	mediumseagreen: '#3cb371',
	mediumslateblue: '#7b68ee',
	mediumspringgreen: '#00fa9a',
	mediumturquoise: '#48d1cc',
	mediumvioletred: '#c71585',
	midnightblue: '#191970',
	mintcream: '#f5fffa',
	mistyrose: '#ffe4e1',
	moccasin: '#ffe4b5',
	navajowhite: '#ffdead',
	navy: '#000080',
	oldlace: '#fdf5e6',
	olive: '#808000',
	olivedrab: '#6b8e23',
	orange: '#ffa500',
	orangered: '#ff4500',
	orchid: '#da70d6',
	palegoldenrod: '#eee8aa',
	palegreen: '#98fb98',
	paleturquoise: '#afeeee',
	palevioletred: '#db7093',
	papayawhip: '#ffefd5',
	peachpuff: '#ffdab9',
	peru: '#cd853f',
	pink: '#ffc0cb',
	plum: '#dda0dd',
	powderblue: '#b0e0e6',
	purple: '#800080',
	rebeccapurple: '#663399',
	red: '#ff0000',
	rosybrown: '#bc8f8f',
	royalblue: '#4169e1',
	saddlebrown: '#8b4513',
	salmon: '#fa8072',
	sandybrown: '#f4a460',
	seagreen: '#2e8b57',
	seashell: '#fff5ee',
	sienna: '#a0522d',
	silver: '#c0c0c0',
	skyblue: '#87ceeb',
	slateblue: '#6a5acd',
	slategray: '#708090',
	slategrey: '#708090',
	snow: '#fffafa',
	springgreen: '#00ff7f',
	steelblue: '#4682b4',
	tan: '#d2b48c',
	teal: '#008080',
	thistle: '#d8bfd8',
	tomato: '#ff6347',
	turquoise: '#40e0d0',
	violet: '#ee82ee',
	wheat: '#f5deb3',
	white: '#ffffff',
	whitesmoke: '#f5f5f5',
	yellow: '#ffff00',
	yellowgreen: '#9acd32',
};
