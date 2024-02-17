import styled from '@emotion/styled';
import { useQuery } from '@repo/common-client';
import { auth as firebaseUIAuth } from 'firebaseui';
import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { PathNames } from '@/core/configs/paths';

const AppBaseElement = styled.div`
	height: 100vh;
	margin: 0;
	padding: 0;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

type AppBaseContainerProps = {
	isVerified: boolean;
};

export const AppBaseContainer: FC<AppBaseContainerProps> = ({ isVerified }) => {
	const navigate = useNavigate();
	const query = useQuery();

	useEffect(() => {
		const existingInstance = firebaseUIAuth.AuthUI.getInstance();

		if (isVerified && !existingInstance?.isPendingRedirect()) {
			const queryString = query.toString();
			navigate(`${PathNames.SUCCESS}?${queryString}`);
		}
	}, [isVerified]);

	return (
		<AppBaseElement className="base-container">
			<Outlet />
		</AppBaseElement>
	);
};
