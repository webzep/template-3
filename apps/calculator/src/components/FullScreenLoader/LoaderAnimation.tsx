import styled from '@emotion/styled';
import { Color, ColorUtility, TonalPalette } from '@repo/colors';
import { useTheme } from '@repo/ui';
import { FC, useMemo } from 'react';

import loaderJson from '@/components/FullScreenLoader/lottie-loading.json';
import { LottiePlayer } from '@/components/LottiePlayer/LottiePlayer';

const AnimationContainer = styled.div`
	align-items: center;
	display: flex;
	height: 100%;
	justify-content: center;
	margin: -100px 0px;
	width: 100%;
`;

export const LoaderAnimation: FC = () => {
	const theme = useTheme();

	const animationString = useMemo(() => {
		const composeToneToArray = (tone: Color) => {
			const rgb = ColorUtility.rgb
				.decomposeNumeric(tone.rgb)
				.map((value) => value / 255);

			return `[${rgb.join()},1]`;
		};

		const color = new Color(theme.palette.brand1);
		const palette = new TonalPalette(color);
		const color1 = composeToneToArray(palette.tones[50]);
		const color2 = composeToneToArray(palette.tones[60]);
		const color3 = composeToneToArray(palette.tones[70]);
		const color4 = composeToneToArray(palette.tones[80]);

		const circle1Color = '[0.1,0,0,1]';
		const circle2Color = '[0.2,0,0,1]';
		const circle3Color = '[0.3,0,0,1]';
		const circle4Color = '[0.4,0,0,1]';

		return JSON.stringify(loaderJson)
			.replaceAll(circle1Color, color1)
			.replaceAll(circle2Color, color2)
			.replaceAll(circle3Color, color3)
			.replaceAll(circle4Color, color4);
	}, []);

	return (
		<AnimationContainer>
			<LottiePlayer src={animationString} />
		</AnimationContainer>
	);
};
