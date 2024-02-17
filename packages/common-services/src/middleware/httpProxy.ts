// const proxy = require('@fastify/http-proxy');
import proxy from '@fastify/http-proxy';
import { FastifyInstance } from 'fastify';

export const registerHttpProxy = (
	app: FastifyInstance,
	upstreamUrl: string,
	apiPrefix = ''
) => {
	app.register(proxy, {
		http2: false,
		prefix: apiPrefix,
		upstream: `${upstreamUrl}/${apiPrefix}`,
	});
};
