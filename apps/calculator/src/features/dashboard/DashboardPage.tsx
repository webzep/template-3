import styled from '@emotion/styled';
import { Typography } from '@repo/ui';
import { FC, Fragment } from 'react';

import { SetUpPage } from '@/features/settings/account/SetUpPage';

const DashboardPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 2rem;
	width: 100%;
`;

export const DashboardPage: FC = () => {
	return (
		<Fragment>
			<DashboardPageContainer>
				<Typography variant="h1">Dashboard</Typography>
			</DashboardPageContainer>
			<SetUpPage />
		</Fragment>
	);
};
