import styled from '@emotion/styled';
import {
	Button,
	Column,
	Container,
	IconNames,
	MaterialIcon,
	Row,
	Typography,
	useTheme,
} from '@repo/ui';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { LottiePlayer } from '@/components/LottiePlayer/LottiePlayer';
import { PathNames } from '@/core/configs/paths';

import animation from './not-found-animation.json';

const PageContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 15vh;
	width: 100vw;
`;

type ListItemProps = {
	icon: IconNames;
	label: string;
	to: string;
};

const ListItem: FC<ListItemProps> = ({ icon, label, to }) => {
	const theme = useTheme();

	return (
		<Row align="center">
			<MaterialIcon fontColor={theme.palette.font2} icon={icon} />
			<Link to={`/${to}`}>
				<Button color={theme.palette.font2} variant="text">
					{label}
				</Button>
			</Link>
		</Row>
	);
};
export const NotFoundPage: FC = () => {
	const theme = useTheme();

	return (
		<PageContainer>
			<Container fixedWidth={theme.breakpoints.md}>
				<Row align="center" justify="center">
					<LottiePlayer src={JSON.stringify(animation)} />
					<Column>
						<Typography variant="h6">
							Oops, nothing to see here.
						</Typography>
						<Typography variant="body">
							Check out a few other pages below that you might
							like to visit:
						</Typography>
						<ListItem icon="home" label="Dashboard" to="" />
						<ListItem
							icon="settings"
							label="Settings"
							to={PathNames.SETTINGS}
						/>
						<ListItem
							icon="help"
							label="Help"
							to={PathNames.SUPPORT}
						/>
						<ListItem
							icon="policy"
							label="Privacy Policy"
							to={PathNames.PRIVACY_POLICY}
						/>
						<ListItem
							icon="description"
							label="Terms of Service"
							to={PathNames.TERMS_OF_SERVICE}
						/>
					</Column>
				</Row>
			</Container>
		</PageContainer>
	);
};
