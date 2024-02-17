import { Color } from './Color';

enum ToneEnum {
	'_0' = 0,
	'_10' = 10,
	'_20' = 20,
	'_30' = 30,
	'_40' = 40,
	'_50' = 50,
	'_60' = 60,
	'_70' = 70,
	'_80' = 80,
	'_90' = 90,
	'_95' = 95,
	'_99' = 99,
	'_100' = 100,
}

type ITones = { [tone in ToneEnum]: Color };

export class TonalPalette {
	private _keyColor: Color = new Color('white');
	private _tones: ITones = {} as ITones;

	constructor(color: Color) {
		this._set(color);
	}

	get tones() {
		return this._tones;
	}

	get keyColor() {
		return this._keyColor;
	}

	set keyColor(color) {
		this._set(color);
	}

	private _set(color: Color | null) {
		this._keyColor = color as Color;
		this._generateTones();
	}

	private _generateTones() {
		for (const tone in ToneEnum) {
			if (tone.includes('_')) continue;
			const clone = this.keyColor.clone();
			clone.lightness = Number(tone);
			this._tones[tone as unknown as ToneEnum] = clone;
		}
	}
}
