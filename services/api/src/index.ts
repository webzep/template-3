import 'reflect-metadata';
import '@repo/common-services/src/services/firebase';

import { registerCookieDecoder } from '@repo/common-services/src/middleware/cookies';
import createFastifyInstance from 'fastify';

import { environment } from '@/configs/environment';
import { registerRoutes } from '@/routes/register-routes';

const app = createFastifyInstance();

registerCookieDecoder(app);
registerRoutes(app);

const host = '0.0.0.0';
const port = Number(environment.PORT);
app.listen({ host, port }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Listening on ${address}`);
});
