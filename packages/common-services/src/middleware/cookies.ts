import type { FastifyCookieOptions } from '@fastify/cookie';
import cookie from '@fastify/cookie';
import { FastifyInstance } from 'fastify';

export const registerCookieDecoder = (app: FastifyInstance) => {
	app.register(cookie, {
		hook: 'onRequest',
		parseOptions: {}, // options for parsing cookies
	} as FastifyCookieOptions);
};
