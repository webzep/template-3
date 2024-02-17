import { FC } from 'react';

import { useScript } from '@/core/hooks/useScript';

type LottiePlayerProps = {
	height?: string;
	src: string;
	width?: string;
};

export const LottiePlayer: FC<LottiePlayerProps> = ({
	height = '300px',
	src,
	width = '300px',
}) => {
	useScript(
		'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'
	);

	return (
		<lottie-player
			autoplay
			background="transparent"
			loop
			mode="forward"
			speed="0.8"
			src={src}
			style={{ height, width }}
		/>
	);
};
