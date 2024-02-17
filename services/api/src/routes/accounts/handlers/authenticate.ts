import { AccountResponseDto } from '@repo/common';
import {
	getEncodedTokenFromHeader,
	verifyFirebaseIdToken,
} from '@repo/common-services/src/services/firebase';
import { getAuth } from 'firebase-admin/auth';

import { PostRequestHandler } from '@/types/requestTypes';

export const getCustomToken: PostRequestHandler<
	null,
	AccountResponseDto
> = async (request, reply) => {
	const token = getEncodedTokenFromHeader(request);
	const decodedToken = await verifyFirebaseIdToken(token);

	if (!token || !decodedToken) {
		return reply.status(401).send({ message: 'Could not verify' });
	}

	const customToken = await getAuth()
		.createCustomToken(decodedToken.uid)
		.catch((error) => {
			console.log('Error creating custom token:', error);
		});

	return reply.status(200).send({ data: customToken });
};
