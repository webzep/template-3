import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import {
	Button,
	Container,
	MaterialIcon,
	Padding,
	Tooltip,
	Typography,
} from '@repo/ui';
import { FC, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { SettingsTabGroup } from '@/features/settings/components/SettingsTabGroup';

const SettingsPageContainer = styled.div`
	display: flex;
	height: 100vh;
	width: 100vw;
`;

const SetttingsContentContainer = styled.div`
	align-items: flex-start;
	display: flex;
	flex-direction: column;
	flex: 1 1 800px;
	padding: ${({ theme }) => `calc(${theme.sizes.padding} * ${6})`};
	position: relative;
	overflow-y: scroll;
`;

type EscapeContainerProps = {
	right: number;
};

const EscapeContainer = styled.div<EscapeContainerProps>`
	${({ right, theme }) => {
		return css`
			align-items: center;
			color: ${theme.palette.font2};
			display: flex;
			flex-direction: column;
			left: calc(50% + 430px);
			opacity: 0.8;
			position: fixed;
			left: ${right - 20}px;
			top: 48px;
		`;
	}};
`;

const EscapeButton = styled(Button)`
	border: ${({ theme }) => `2px solid ${theme.palette.font2}`};
	color: ${({ theme }) => theme.palette.font2};
	height: 40px;
	margin-bottom: 4px;
	min-width: 0px;
	padding: 4px;
	width: 40px;
`;

export const SettingsPage: FC = () => {
	const navigate = useNavigate();
	const contentRef = useRef<HTMLDivElement>();
	const theme = useTheme();
	const [escapePosition, setEscapePosition] = useState<number>(700);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handleBackClicked();
			}
		};
		addEventListener('keydown', handleEscape);

		const handleResize = () => {
			if (contentRef.current) {
				const { right } = contentRef.current.getBoundingClientRect();
				setEscapePosition(right);
			}
		};
		addEventListener('resize', handleResize);
		handleResize();

		return () => {
			removeEventListener('keydown', handleEscape);
			removeEventListener('resize', handleResize);
		};
	}, []);

	const handleBackClicked = () => navigate(`/`);

	return (
		<SettingsPageContainer>
			<SettingsTabGroup />
			<SetttingsContentContainer>
				<Container
					fixedWidth={theme.breakpoints.md}
					marginLeft="0"
					ref={contentRef}
				>
					<Padding multiplier={8}>
						<Outlet />
					</Padding>
					<EscapeContainer right={escapePosition}>
						<Tooltip tip="Close">
							<EscapeButton iconOnly onClick={handleBackClicked}>
								<MaterialIcon icon="close" />
							</EscapeButton>
						</Tooltip>
						<Typography variant="overline">ESC</Typography>
					</EscapeContainer>
				</Container>
			</SetttingsContentContainer>
		</SettingsPageContainer>
	);
};
