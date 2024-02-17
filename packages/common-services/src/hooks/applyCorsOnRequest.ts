import { FastifyInstance } from 'fastify';

export const applyCorsOnRequest = (
	app: FastifyInstance,
	whitelist: string[]
) => {
	app.addHook('onRequest', (request, reply, done) => {
		reply.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept'
		);
		reply.header(
			'Access-Control-Allow-Methods',
			'GET, PATCH, POST, PUT, DELETE, OPTIONS'
		);
		reply.header('Access-Control-Allow-Credentials', 'true');
		reply.header('Access-Control-Max-Age', '3600');
		const allowCors = (url = '*') =>
			reply.header('Access-Control-Allow-Origin', url);

		const origin = request.headers.origin ?? '';
		if (!whitelist) {
			allowCors();
		} else if (whitelist.some((item) => item.includes(origin))) {
			allowCors(origin);
		}

		const isPreflight = /options/i.test(request.method);
		if (isPreflight) {
			return reply.send();
		}

		done();
	});
};
