import styled from '@emotion/styled';
import {
	Button,
	Column,
	Container,
	Row,
	Typography,
	useSnackbar,
	useTheme,
} from '@repo/ui';
import { FC, useState } from 'react';

import { LottiePlayer } from '@/components/LottiePlayer/LottiePlayer';
import { useDispatch } from '@/core/store/hooks';
import { getAuthToken } from '@/features/settings/account/accountActions';

import animation from './no-connection.json';

const PageContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 15vh;
	position: fixed;
	width: 100vw;
`;

export const ErrorPage: FC = () => {
	const dispatch = useDispatch();
	const snackbar = useSnackbar();
	const theme = useTheme();
	const [isRetrying, setIsRetrying] = useState(false);

	const handleTryAgain = async () => {
		setIsRetrying(true);
		const getTokenResponse = await dispatch(getAuthToken());
		const fulfilled = getAuthToken.fulfilled.match(getTokenResponse);

		// Wait a moment for UI
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, 1000);
		});

		if (fulfilled) {
			location.pathname = '/';
		} else {
			setIsRetrying(false);
			snackbar.error('Still no luck. Try again shortly.');
		}
	};

	return (
		<PageContainer>
			<Container fixedWidth={theme.breakpoints.md}>
				<Row align="center" justify="center">
					<LottiePlayer src={JSON.stringify(animation)} />
					<Column>
						<Typography variant="h6">
							It looks like you&apos;re having trouble connecting
							to our servers.
						</Typography>
						<Typography variant="body">
							Try again shortly.
						</Typography>

						<Button
							disabled={isRetrying}
							loading={isRetrying}
							onClick={handleTryAgain}
						>
							Try again
						</Button>
					</Column>
				</Row>
			</Container>
		</PageContainer>
	);
};
