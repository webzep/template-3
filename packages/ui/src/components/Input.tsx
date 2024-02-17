import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes } from 'react';

const InputRoot = styled.input<InputProps>`
	${({ fullWidth, theme }) => css`
		background-color: ${theme.palette.bg1};
		border-radius: ${theme.sizes.borderRadiusSmall};
		border: 1px solid ${theme.palette.border1};
		color: ${theme.palette.font1};
		display: flex;
		flex-direction: column;
		font-size: 16px;
		font-weight: 500;
		height: 40px;
		overflow: hidden;
		padding: 2px 8px;
		position: relative;
		transition: width 0.2s ease-in-out;
		width: ${fullWidth ? '100%' : '400px'};

		&:focus {
			outline: ${theme.sizes.borderWidth} solid ${theme.palette.brand1};
		}
	`};
`;

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	fullWidth?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ fullWidth, ...props },
	ref
) {
	return <InputRoot fullWidth={fullWidth} ref={ref} {...props} />;
});
