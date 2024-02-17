import 'firebaseui/dist/firebaseui.css';

import {
	checkIsValidUrl,
	createFirebaseUIConfig,
	getFirebaseAuth,
	useQuery,
} from '@repo/common-client';
import { auth as firebaseUIAuth } from 'firebaseui';
import { FC, Fragment, useEffect, useRef, useState } from 'react';

import { appNameTitleCase } from '@/core/configs/constants';
import { environment } from '@/core/configs/environment';
import { PathNames } from '@/core/configs/paths';
import { SignInBackground } from '@/features/authentication/SignInBackground';

/**
 * @docs https://github.com/firebase/firebaseui-web#starting-the-sign-in-flow
 */
export const SignInPage: FC = () => {
	const ref = useRef<HTMLDivElement>();
	const [timeoutFinished, setTimeoutFinished] = useState(false);
	const query = useQuery();

	useEffect(() => {
		if (ref.current) {
			const redirectUrl = query.get('redirect_url') ?? '';
			const isValidUri = checkIsValidUrl(redirectUrl);

			const url = new URL(`${location.host}/${PathNames.SUCCESS}`);
			isValidUri && url.searchParams.append('redirect_url', redirectUrl);

			const firebaseUIConfig = createFirebaseUIConfig(
				environment.VITE_WEBSITE_URL,
				PathNames.SUCCESS
			);
			firebaseUIConfig.signInSuccessUrl = url.href;

			const existingInstance = firebaseUIAuth.AuthUI?.getInstance();
			if (existingInstance) {
				existingInstance.start(
					'#firebaseui-auth-container',
					firebaseUIConfig
				);
			} else {
				const ui = new firebaseUIAuth.AuthUI(getFirebaseAuth());
				ui.start('#firebaseui-auth-container', firebaseUIConfig);
			}
		}

		setTimeout(() => {
			setTimeoutFinished(true);
		}, 1000);
	}, [timeoutFinished, getFirebaseAuth().currentUser, ref]);

	return (
		<Fragment>
			<h1>{appNameTitleCase}</h1>
			<SignInBackground />
			{timeoutFinished && (
				<div id="firebaseui-auth-container" ref={ref} />
			)}
		</Fragment>
	);
};
