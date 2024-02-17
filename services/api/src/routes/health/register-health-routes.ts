import { EndPoints } from '@repo/common';
import { FastifyInstance } from 'fastify';

export const registerHealthRoutes = (app: FastifyInstance) => {
	app.get(EndPoints.health.check.url, async (_, reply) =>
		reply.status(200).send({ message: 'OK' })
	);
};
