import { clearAuthCookie, getFirebaseAuth } from '@repo/common-client';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { environment } from '@/core/configs/environment';
import { PathNames } from '@/core/configs/paths';

export const SignOutPage: FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const signOut = async () => {
			await getFirebaseAuth().signOut();
			clearAuthCookie(environment.VITE_ENVIRONMENT, location.origin);
		};
		signOut();

		navigate(PathNames.SIGN_IN);
	}, []);

	return <h3>Signing out...</h3>;
};
