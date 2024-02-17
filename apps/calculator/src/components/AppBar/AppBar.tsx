import styled from '@emotion/styled';
import { Button, MaterialIcon, Tooltip, Typography } from '@repo/ui';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { appBarHeight, appNameTitleCase } from '@/core/configs/constants';
import { PathNames } from '@/core/configs/paths';

const ActionsGroup = styled.div`
	display: flex;
`;

const AppBarContainer = styled.div`
	align-items: center;
	background-color: ${({ theme }) => theme.palette.bg1};
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	display: flex;
	height: ${appBarHeight}px;
	justify-content: space-between;
	max-height: ${appBarHeight}px;
	min-height: ${appBarHeight}px;
	padding: 0 2rem;
	position: fixed;
	width: 100vw;
	z-index: ${({ theme }) => theme.zIndex.navbar};
`;

const TitleContainer = styled(Typography)`
	cursor: pointer;
`;

export const AppBar: FC = () => {
	const navigate = useNavigate();

	const handleHomeClicked = () => navigate(`/`);

	const handleSettingsClicked = () => navigate(`/${PathNames.SETTINGS}`);

	return (
		<AppBarContainer>
			<Tooltip direction="bottom" tip="Home">
				<TitleContainer
					noMargin
					onClick={handleHomeClicked}
					variant="h6"
				>
					{appNameTitleCase}
				</TitleContainer>
			</Tooltip>
			<ActionsGroup>
				<Tooltip direction="bottom" tip="Settings">
					<Button
						iconOnly
						onClick={handleSettingsClicked}
						variant="text"
					>
						<MaterialIcon icon="settings" />
					</Button>
				</Tooltip>
			</ActionsGroup>
		</AppBarContainer>
	);
};
