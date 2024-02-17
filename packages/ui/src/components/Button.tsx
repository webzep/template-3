import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

import { Ripple } from './Ripple';
import { Spinnner } from './Spinner';

const Icon = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
	padding: 4px;
`;

const ButtonRoot = styled.button<Omit<ButtonProps, 'label'>>`
	${({
		color,
		disabled,
		iconOnly,
		justify,
		radius,
		size,
		theme,
		variant,
	}) => css`
		align-items: center;
		appearance: none;
		border-radius: ${iconOnly
			? '999px'
			: radius || theme.sizes.borderRadiusSmall};
		cursor: ${disabled ? 'default' : 'pointer'};
		display: inline-flex;
		font-family: ${theme.typeography.family};
		font-weight: 500;
		justify-content: center;
		letter-spacing: 0.02857em;
		line-height: 1.75;
		margin: 0px;
		max-height: 64px;
		min-width: 64px;
		outline: 0px;
		overflow: hidden;
		padding: 6px 16px;
		position: relative;
		text-decoration: none;
		transition:
			background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		user-select: none;
		vertical-align: middle;

		${size === 'sm'
			? css`
					font-size: 0.8125rem;
					min-width: 64px;
					padding: 4px 10px;
				`
			: size === 'lg'
				? css`
						font-size: 0.9375rem;
						min-width: 64px;
						padding: 8px 22px;
					`
				: css`
						font-size: 0.875rem;
						min-width: 64px;
						padding: 6px 16px;
					`}

		${variant === 'text' || iconOnly
			? css`
					background-color: transparent;
					border: none;
					color: ${color ?? theme.palette.font3};

					&:disabled {
						filter: grayscale(100%) brightness(160%);
					}

					&:not(:disabled):hover {
						backdrop-filter: brightness(0.9);
					}
				`
			: variant === 'outlined'
				? css`
						background-color: transparent;
						border-color: ${color ?? theme.palette.brand1};
						border-style: solid;
						border-width: ${theme.sizes.borderWidth};
						color: ${color ?? theme.palette.brand1};

						&:disabled {
							filter: grayscale(100%) brightness(160%);
						}

						&:not(:disabled):hover {
							backdrop-filter: brightness(0.98);
						}
					`
				: css`
						background-color: ${color ?? theme.palette.brand1};
						border: none;
						color: ${theme.palette.onBrand1};

						&:disabled {
							background-color: white;
							color: grey;
							box-shadow: none;
							filter: brightness(95%);
						}

						&:not(:disabled):hover {
							filter: brightness(95%);
						}
					`}

		&:not(:disabled):hover {
			text-decoration: none;
		}

		&:focus-visible {
			outline: 2px solid royalblue;
			outline-offset: 2px;
		}

		${justify && `justify-content: ${justify};`}
	`}
`;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children?: ReactNode;
	disabled?: boolean;
	endIcon?: ReactNode;
	iconOnly?: boolean;
	loading?: boolean;
	justify?: 'flex-start' | 'center' | 'flex-end';
	radius?: string;
	size?: 'sm' | 'md' | 'lg';
	startIcon?: ReactNode;
	variant?: 'contained' | 'outlined' | 'text';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(
		{ children, endIcon, loading = false, startIcon, ...props },
		ref
	) {
		return (
			<ButtonRoot ref={ref} {...props}>
				{!props.disabled && <Ripple />}
				{startIcon && <Icon>{startIcon}</Icon>}
				{loading ? <Spinnner size={24} /> : children}
				{endIcon && <Icon>{endIcon}</Icon>}
			</ButtonRoot>
		);
	}
);
