import { getFirebaseAuth, getFirebaseFirestore } from '@repo/common-client';
import { User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

import { useDispatch, useSelector } from '@/core/store/hooks';
import { setIsAuthenticating } from '@/features/authentication/athenticationSlice';
import {
	createAccount,
	getAccountById,
	getAuthToken,
} from '@/features/settings/account/accountActions';
import {
	makeCreateAccountOptions,
	makeGetAccountOptions,
} from '@/features/settings/account/accountHelpers';
import { setAccount } from '@/features/settings/account/accountSlice';

export const useFirebaseAuth = () => {
	const dispatch = useDispatch();
	const account = useSelector((state) => state.account);

	const handleAuthStateChanged = async (user: User) => {
		dispatch(setIsAuthenticating(true));

		if (user) {
			const options = makeGetAccountOptions(user);
			const accountResponse = await dispatch(getAccountById(options));

			const fulfilledAccResponse =
				getAccountById.fulfilled.match(accountResponse);
			if (fulfilledAccResponse) {
				if (accountResponse.payload.data) {
					dispatch(setAccount(accountResponse.payload.data));
					dispatch(setIsAuthenticating(false));
				}

				if (accountResponse.payload.status === 404) {
					console.log('User exists but not account record!');
					dispatch(createAccount(makeCreateAccountOptions(user)));
				}
			}
		} else {
			dispatch(setIsAuthenticating(false));

			return;
		}

		// if (authenticated) {
		// 	// dispatch(setIsAuthenticating(false));

		// 	return;
		// }

		// const fulfilledAuthResponse =
		// 	authenticateAccount.fulfilled.match(authenticateResponse);
		// if (fulfilledAuthResponse) {
		// 	if (authenticateResponse.payload.message === 'Account not found') {
		// 		dispatch(createAccount(makeCreateAccountOptions(user)));
		// 	} else {
		// 		dispatch(setAccount(authenticateResponse.payload.data));
		// 	}
		// }

		// const serverDown =
		// 	!fulfilledAuthResponse &&
		// 	authenticateResponse.error.message === 'Failed to fetch';
		// if (serverDown) {
		// 	if (user) {
		// 		navigate(`/${PathNames.ERROR}`);
		// 	}
		// 	dispatch(setIsAuthenticating(false));
		// } else if (fulfilledAuthResponse) {
		// 	if ([400, 401].includes(authenticateResponse.payload.status)) {
		// 		handleRedirectToSignIn();
		// 	} else {
		// 		dispatch(setIsAuthenticating(false));
		// 	}
		// }
	};

	useEffect(() => {
		const unsubscribeAuth = getFirebaseAuth().onAuthStateChanged(
			handleAuthStateChanged
		);

		let unsubscribeAccount: ReturnType<typeof onSnapshot>;
		if (account?.id) {
			unsubscribeAccount = onSnapshot(
				doc(getFirebaseFirestore(), 'accounts', account.id),
				(doc) => dispatch(setAccount(doc.data()))
			);
		}

		dispatch(getAuthToken());

		return () => {
			unsubscribeAuth();
			unsubscribeAccount && unsubscribeAccount();
		};
	}, [account.id]);
};
