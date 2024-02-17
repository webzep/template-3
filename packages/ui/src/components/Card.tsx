import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, MouseEvent, ReactNode } from 'react';

import { PaletteConfig } from '../core/themes/palette';

type CardCssProps = {
	align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
	bgColor?: string;
	borderRadius?: 'small' | 'medium' | 'large';
	justify?:
		| 'flex-start'
		| 'center'
		| 'flex-end'
		| 'space-between'
		| 'space-around'
		| 'space-evenly';
	maxHeight?: string;
	padding?: string;
	shadow?: boolean;
	themeBgColor?: keyof PaletteConfig;
};

const CardContainer = styled.div<CardCssProps>`
	${({
		align,
		bgColor,
		borderRadius,
		justify,
		maxHeight,
		padding,
		shadow,
		theme,
		themeBgColor,
	}) => {
		const borderRadiusMap = {
			large: theme.sizes.borderRadiusLarge,
			medium: theme.sizes.borderRadiusMedium,
			small: theme.sizes.borderRadiusSmall,
		};

		const radius = borderRadius
			? borderRadiusMap[borderRadius]
			: theme.sizes.borderRadiusLarge;

		return css`
			align-items: ${align ?? ''};
			background-color: ${bgColor ??
			theme.palette[themeBgColor ?? 'bg2']};
			border-color: ${shadow ? '' : theme.palette.border1};
			border-radius: ${radius};
			color: ${theme.palette.font1};
			display: flex;
			flex-direction: column;
			justify-content: ${justify ?? ''};
			max-height: ${maxHeight ?? ''};
			overflow: hidden;
			padding: ${padding ?? `calc(${theme.sizes.padding} * 4)`};
			position: relative;
		`;
	}};
`;

export type CardProps = CardCssProps & {
	children: ReactNode;
	onClick?: (e: MouseEvent<HTMLDivElement>) => void;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
	{ children, ...props },
	ref
) {
	return (
		<CardContainer id="__Card" ref={ref} {...props}>
			{children}
		</CardContainer>
	);
});
