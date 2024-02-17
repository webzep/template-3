import React from 'react';

export as namespace JSX;

export interface IntrinsicElements {
	'lottie-player': {
		autoplay: boolean;
		background: string;
		loop: boolean;
		mode: 'normal' | 'bounce' | 'forward' | 'reverse';
		speed: string;
		src: string;
		style: React.CSSProperties;
	};
}
