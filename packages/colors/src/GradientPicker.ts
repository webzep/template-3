/** Create a gradient then pick colors at positions based on percentage
 * @example
 * const Picker = new GradientPicker([
 * 	{"color": "#FFA23F","offset": 0},
 * 	{"color": "#FF624A","offset": 0.4},
 * 	{"color": "#FE0060","offset": 1}
 * ])
 * const color = Picker.at(70)
 */
export class GradientPicker {
	context: CanvasRenderingContext2D | null = null;

	constructor(private stops: { offset: number; color: string }[]) {
		const canvas = document.createElement('canvas');
		canvas.width = 101;
		canvas.height = 1;

		this.context = canvas.getContext('2d');

		if (this.context) {
			const gradient = this.context.createLinearGradient(0, 0, 101, 0);
			this.stops.forEach(({ offset, color }) =>
				gradient.addColorStop(offset, color)
			);

			this.context.fillStyle = gradient;
			this.context.fillRect(0, 0, canvas.width, canvas.height);
		}
	}

	/** Convert RGB color to HEX */
	private rgbToHex = (r: number, g: number, b: number) => {
		return `#${[r, g, b].map((x) => (+x).toString(16).padStart(2, '0')).join('')}`;
	};

	/** Get color at percentage along gradient */
	public at = (percentage: number) => {
		const data =
			this.context &&
			this.context.getImageData(percentage | 0, 0, 1, 1).data;

		return this.rgbToHex(data?.[0] ?? 0, data?.[1] ?? 0, data?.[2] ?? 0);
	};
}
