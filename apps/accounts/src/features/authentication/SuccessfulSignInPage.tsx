import { checkIsValidUrl, useQuery } from '@repo/common-client';
import { FC, Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { environment } from '@/core/configs/environment';
import { PathNames } from '@/core/configs/paths';

type SuccessfulSignInPageProps = {
	isVerified: boolean;
};

export const SuccessfulSignInPage: FC<SuccessfulSignInPageProps> = ({
	isVerified,
}) => {
	const navigate = useNavigate();
	const query = useQuery();

	useEffect(() => {
		if (!isVerified) {
			navigate(PathNames.SIGN_IN);

			return;
		}

		const redirectUrl = decodeURIComponent(query.get('redirect_url') ?? '');
		const isValidUri = checkIsValidUrl(redirectUrl);

		const redirect = isValidUri
			? redirectUrl
			: environment.VITE_WEBSITE_URL;

		setTimeout(() => {
			location.href = redirect;
		}, 1000);
	}, [query, isVerified]);

	return (
		<Fragment>
			<h1>Welcome</h1>
			<br />
			<span>redirecting...</span>
		</Fragment>
	);
};
