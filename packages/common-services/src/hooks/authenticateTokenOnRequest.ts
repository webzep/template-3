import {
	getEncodedTokenFromHeader,
	verifyFirebaseIdToken,
} from '@repo/common-services/src/services/firebase';
import { FastifyInstance } from 'fastify';

export const authenticateTokenOnRequest = (app: FastifyInstance) => {
	app.addHook('onRequest', async (request, reply) => {
		const isHealthCheck = /health/i.test(request.url);
		if (isHealthCheck) {
			return reply.send({ message: 'Health check OK' });
		}

		const encodedToken = await getEncodedTokenFromHeader(request);
		if (!encodedToken) {
			return reply.status(400).send({ message: 'Token required' });
		}

		await verifyFirebaseIdToken(encodedToken).catch((error) => {
			console.error('Token verification failed: ', error);
			reply.status(401).send({ message: 'Authentication failed' });

			return;
		});
	});
};
