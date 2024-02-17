import 'reflect-metadata';
import '@repo/common-services/src/services/firebase';

import { Environments } from '@repo/common';
import { applyCorsOnRequest } from '@repo/common-services/src/hooks/applyCorsOnRequest';
import { authenticateTokenOnRequest } from '@repo/common-services/src/hooks/authenticateTokenOnRequest';
import { registerCookieDecoder } from '@repo/common-services/src/middleware/cookies';
import { registerHttpProxy } from '@repo/common-services/src/middleware/httpProxy';
import createFastifyInstance from 'fastify';

import { environment } from '@/configs/environment';

import { corsWhitelistMap } from '@/configs/corsWhitelist';

const env = environment.ENVIRONMENT ?? Environments.DEVELOPMENT;

const app = createFastifyInstance();
registerCookieDecoder(app);
applyCorsOnRequest(app, corsWhitelistMap[env]);
authenticateTokenOnRequest(app);
registerHttpProxy(app, environment.SERVICES_API_URL);

const host = '0.0.0.0';
const port = Number(environment.PORT);
app.listen({ host, port }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Listening on ${address}`);
});
