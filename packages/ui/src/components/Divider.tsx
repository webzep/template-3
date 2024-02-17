import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef } from 'react';

const DividerRoot = styled.hr<DividerProps>`
	${({ bgColor, margin, theme, vertical, weight }) => css`
		align-self: stretch;
		background-color: ${bgColor ?? theme.palette.border1};
		border: none;
		box-sizing: border-box;
		display: inline-block;
		height: ${vertical ? 'auto' : (weight || 1) + 'px'};
		margin: ${margin ?? '12px 0'};
		overflow: visible;
		padding: 0;
		width: ${vertical ? (weight || 1) + 'px' : '100%'};
	`};
`;

export type DividerProps = {
	bgColor?: string;
	margin?: string;
	vertical?: boolean;
	weight?: number;
};

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
	function Divider(props, ref) {
		return <DividerRoot ref={ref} {...props} />;
	}
);
