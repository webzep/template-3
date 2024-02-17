import { FastifyRequest } from 'fastify';
import { getApp, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const createFirebaseApp = (config = {}) => {
	try {
		return getApp();
	} catch {
		return initializeApp(config);
	}
};

export const firebaseApp = createFirebaseApp();

export const firestore = getFirestore(firebaseApp);

export const accountsCollection = firestore.collection('accounts');

export const getEncodedTokenFromHeader = (request: FastifyRequest) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const authToken = request.cookies.authToken ?? '';

	return authToken;
};

export const verifyFirebaseIdToken = async (idToken: string) =>
	getAuth()
		.verifyIdToken(idToken)
		.catch((error) => {
			console.error('verifyFirebaseIdToken failed: ', error);

			return null;
		});
