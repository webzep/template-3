import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, ReactNode } from 'react';

type RowCssProps = {
	align?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';
	justify?:
		| 'center'
		| 'flex-end'
		| 'flex-start'
		| 'left'
		| 'right'
		| 'space-around'
		| 'space-between'
		| 'space-evenly';
	gap?: number;
};

type HiddenCssProps = {
	wrap?: number;
};

const RowContainer = styled.div<RowCssProps & HiddenCssProps>`
	${({ align, gap, justify, wrap, theme }) => css`
		align-items: ${align};
		display: flex;
		flex-direction: row;
		flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
		${gap &&
		css`
			gap: calc(${gap} * ${theme.sizes.padding});
		`}
		justify-content: ${justify};
		min-width: 100%;
		padding: 0px;
		width: 100%;
	`};
`;

export type RowProps = RowCssProps & {
	children: ReactNode;
	wrap?: boolean;
};

export const Row = forwardRef<HTMLDivElement, RowProps>(function Row(
	{ children, wrap, ...props },
	ref
) {
	return (
		<RowContainer id="__ui-row" ref={ref} wrap={wrap ? 1 : 0} {...props}>
			{children}
		</RowContainer>
	);
});
