import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
	Children,
	cloneElement,
	forwardRef,
	isValidElement,
	JSXElementConstructor,
	MouseEvent,
	MutableRefObject,
	ReactElement,
	ReactNode,
	RefObject,
	useEffect,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';

import { ReactHTMLProps } from '../core/types/interfaces';
import { Backdrop, BackdropProps } from './Backdrop';
import { Card } from './Card';

export type Transform = {
	horizontal?: 'left' | 'center' | 'right';
	vertical?: 'top' | 'center' | 'bottom';
};

const MenuContainer = styled(Card)<MenuProps & { pos?: DOMRect | null }>`
	${({
		pos,
		anchorOrigin,
		positionOverride,
		theme,
		transformOrigin,
		width,
	}) => {
		const getLeft = () => {
			if (positionOverride) return positionOverride.left;
			if (!pos || pos.x === undefined) return 0;
			if (!anchorOrigin) return pos.x;

			let x = pos.x;
			if (anchorOrigin.horizontal === 'center') x += pos.width / 2;
			else if (anchorOrigin.horizontal === 'right') x += pos.width;

			return x;
		};
		const left = getLeft();

		const getTop = () => {
			if (positionOverride) return positionOverride.top;
			if (!pos || pos.y === undefined) return 0;
			if (!anchorOrigin) return pos.y + pos.height;

			let y = pos.y;
			if (anchorOrigin.vertical === 'center') y += pos.height / 2;
			else if (anchorOrigin.vertical === 'bottom') y += pos.height;

			return y;
		};
		const top = getTop();

		const getTransform = () => {
			if (!transformOrigin) return 'none';
			let x = 0;
			let y = 0;
			if (transformOrigin.horizontal === 'center') x = -50;
			else if (transformOrigin.horizontal === 'right') x = -100;
			else x = 0;

			if (transformOrigin.vertical === 'center') y = -50;
			else if (transformOrigin.vertical === 'bottom') y = -100;
			else y = 0;

			return `translate(${x}%, ${y}%)`;
		};
		const transform = getTransform();

		return css`
			background-color: ${theme.palette.bg1};
			border-radius: 4px;
			box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.6);
			display: flex;
			left: ${left}px;
			max-width: 280px;
			min-height: 10px;
			min-width: 112px;
			padding: 0;
			position: fixed;
			top: ${top}px;
			transform: ${transform};
			width: ${width};
			z-index: 2000;
		`;
	}};
`;

const UnorderedList = styled.ul`
	${({ theme }) => css`
		color: inherit;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		list-style: none;
		margin: 0px;
		outline: 0px;
		padding: 8px 0px;
		position: relative;

		> hr {
			background-color: ${theme.palette.bg2};
			margin: 4px 0px;
		}
	`};
`;

export type MenuProps = ReactHTMLProps<HTMLDivElement> & {
	_nested?: boolean;
	anchorElement?: MutableRefObject<HTMLElement>;
	anchorOrigin?: Transform;
	backdropProps?: Partial<BackdropProps>;
	children: ReactNode;
	onClose?: () => void;
	open: boolean;
	positionOverride?: { top: number; left: number };
	transformOrigin?: Transform;
	width?: string;
};

export const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu(
	{ children, ...props },
	ref
) {
	const [position, setPosition] = useState<DOMRect>();
	const menuRef = (ref ||
		useRef<HTMLDivElement>(null)) as RefObject<HTMLDivElement>;

	useEffect(() => {
		setPosition(props.anchorElement?.current?.getBoundingClientRect());
	}, [props.anchorElement?.current]);

	const handleClickAway = () => {
		if (!props.open || !menuRef || !menuRef.current) return;
		props.onClose && props.onClose();
	};

	const isNested = props._nested;

	const handleClick = (e: MouseEvent) => {
		const element = e.target as HTMLDivElement;
		const isNestedItem =
			element.parentElement?.className.includes('_NestedMenuItem');

		if (!isNestedItem) {
			props.onClose && props.onClose();
		}
	};

	/**
	 * @description Groups are defined by dividers. Handle indentation from icons in same
	 * group. If item 1 has a start icon and item 2 (in the same group)
	 * doesn't, then it should be indented for the text to align.
	 */
	const groups: {
		[key: number]: { hasEnd?: boolean; hasStart?: boolean };
	} = {};
	let iGroup = 1;
	Children.forEach(children, (child) => {
		if (isValidElement(child) && typeof child.type !== 'string') {
			const isDivider = child.type.name === 'Divider';
			if (isDivider) {
				iGroup++;

				return;
			}
			groups[iGroup] = groups[iGroup] ?? {
				hasEnd: false,
				hasStart: false,
			};

			if (child.props.startIcon) {
				groups[iGroup] = { ...groups[iGroup], hasStart: true };
			}

			if (child.props.endIcon) {
				groups[iGroup] = { ...groups[iGroup], hasEnd: true };
			}
		}
	});

	// Add padding prop if required
	let jGroup = 1;
	const clonedChildren = Children.map(children, (child) => {
		if (isValidElement(child) && typeof child.type !== 'string') {
			const isDivider = child.type.name === 'Divider';
			if (isDivider) {
				jGroup++;

				return child;
			}

			return cloneElement(
				child as ReactElement<
					{ padEnd: boolean; padStart: boolean },
					string | JSXElementConstructor<unknown>
				>,
				{
					padEnd: groups[jGroup].hasEnd && !child.props.endIcon,
					padStart: groups[jGroup].hasStart && !child.props.startIcon,
				}
			);
		}
	});

	return props.open
		? createPortal(
				<>
					{!isNested && (
						<Backdrop
							onClose={handleClickAway}
							bgColor="transparent"
							{...props.backdropProps}
						/>
					)}
					<MenuContainer
						ref={menuRef}
						pos={position}
						onClick={handleClick}
						{...props}
					>
						<UnorderedList>{clonedChildren}</UnorderedList>
					</MenuContainer>
				</>,
				document.body
			)
		: null;
});
