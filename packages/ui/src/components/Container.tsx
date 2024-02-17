import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, ReactNode } from 'react';

type ContainerCssProps = {
	limitHeightToScreen?: boolean;
	marginLeft?: string;
	marginRight?: string;
	paddingRight?: string;
	paddingLeft?: string;
	fixedWidth?: string;
};

const ContainerRoot = styled.div<ContainerCssProps>`
	${({
		limitHeightToScreen,
		marginLeft,
		marginRight,
		paddingLeft,
		paddingRight,
		theme,
		fixedWidth,
	}) => css`
		display: flex;
		flex-direction: column;
		margin-left: ${marginLeft === undefined ? 'auto' : marginLeft};
		margin-right: ${marginRight === undefined ? 'auto' : marginRight};
		max-height: ${limitHeightToScreen ? '100vh' : ''};
		padding-bottom: 0px;
		padding-left: ${paddingLeft || '0px'};
		padding-right: ${paddingRight || '0px'};
		padding-top: 0px;
		position: relative;
		width: 100%;

		${fixedWidth
			? css`
					max-width: ${fixedWidth};
				`
			: css`
					@media (min-width: ${theme.breakpoints.xs}) {
						max-width: ${theme.breakpoints.xs};
					}

					@media (min-width: ${theme.breakpoints.sm}) {
						max-width: ${theme.breakpoints.sm};
					}

					@media (min-width: ${theme.breakpoints.md}) {
						max-width: ${theme.breakpoints.md};
					}

					@media (min-width: ${theme.breakpoints.lg}) {
						max-width: ${theme.breakpoints.lg};
					}

					@media (min-width: ${theme.breakpoints.xl}) {
						max-width: ${theme.breakpoints.xl};
					}
				`}
	`};
`;

export type ContainerProps = Omit<ContainerCssProps, 'width'> & {
	children: ReactNode;
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
	function Container({ children, ...props }, ref) {
		return (
			<ContainerRoot id="__Container" ref={ref} {...props}>
				{children}
			</ContainerRoot>
		);
	}
);
