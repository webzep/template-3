import {
	clearAuthCookie,
	getFirebaseAuth,
	setAuthCookie,
} from '@repo/common-client';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { environment } from '@/core/configs/environment';

export const useFirebaseAuth = () => {
	const [isVerified, setIsVerified] = useState(false);

	const handleAuthStateChanged = async (user: User) => {
		if (!user) {
			setIsVerified(false);
			clearAuthCookie(environment.VITE_ENVIRONMENT, location.origin);

			return;
		}

		const token = await user.getIdToken();
		setAuthCookie(environment.VITE_ENVIRONMENT, location.origin, token);

		setIsVerified(true);
	};

	useEffect(() => {
		const unsubscribeAuth = getFirebaseAuth().onAuthStateChanged(
			handleAuthStateChanged
		);

		return () => {
			unsubscribeAuth();
		};
	}, []);

	return isVerified;
};
