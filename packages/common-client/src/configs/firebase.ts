import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { EmailAuthProvider, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { auth } from 'firebaseui';

export let firebaseApp: FirebaseApp;

export const initialiseFirebaseApp = (
	apiKey: string,
	appId: string,
	authDomain: string,
	measurementId: string,
	messagingSenderId: string,
	projectId: string,
	storageBucket: string
) => {
	try {
		firebaseApp = getApp();
	} catch {
		firebaseApp = initializeApp({
			apiKey,
			appId,
			authDomain,
			measurementId,
			messagingSenderId,
			projectId,
			storageBucket,
		});
	}
};

export const getFirebaseAuth = () => getAuth(firebaseApp);

export const getFirebaseAnalytics = () => getAnalytics(firebaseApp);

export const getFirebaseFirestore = () => getFirestore(firebaseApp);

export const createFirebaseUIConfig = (
	websiteUrl: string,
	successPath: string
) => {
	const firebaseUIConfig: firebaseui.auth.Config = {
		callbacks: {
			signInSuccessWithAuthResult: () => true,
		},
		privacyPolicyUrl: () =>
			window.location.assign(`${websiteUrl}/privacy-policy`),
		signInFlow: 'popup',
		signInOptions: [
			GoogleAuthProvider.PROVIDER_ID,
			EmailAuthProvider.PROVIDER_ID,
			auth.AnonymousAuthProvider.PROVIDER_ID,
		],
		signInSuccessUrl: `/${successPath}`,
		tosUrl: () => window.location.assign(`${websiteUrl}/terms-of-service`),
	};

	return firebaseUIConfig;
};
