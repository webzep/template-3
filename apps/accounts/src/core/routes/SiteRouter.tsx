import { useQuery } from '@repo/common-client';
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PathNames } from '@/core/configs/paths';
import { useFirebaseAuth } from '@/core/hooks/useFirebaseAuth';
import { AppBaseContainer } from '@/core/layouts/AppBaseContainer';
import { SignInPage } from '@/features/authentication/SignInPage';
import { SignOutPage } from '@/features/authentication/SignOutPage';
import { SuccessfulSignInPage } from '@/features/authentication/SuccessfulSignInPage';

export const SiteRouter: FC = () => {
	const isVerified = useFirebaseAuth();
	const query = useQuery();

	const queryString = query.toString();

	return (
		<Routes>
			<Route path={PathNames.SIGN_OUT} element={<SignOutPage />} />
			<Route element={<AppBaseContainer isVerified={isVerified} />}>
				<Route
					path={PathNames.SUCCESS}
					element={<SuccessfulSignInPage isVerified={isVerified} />}
				/>
				<Route path={PathNames.SIGN_IN} element={<SignInPage />} />
				<Route path={PathNames.SIGN_UP} element={<SignInPage />} />
				<Route
					path="*"
					element={
						<Navigate to={`${PathNames.SIGN_IN}?${queryString}`} />
					}
				/>
			</Route>
		</Routes>
	);
};
