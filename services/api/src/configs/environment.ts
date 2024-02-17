import { Environments } from '@repo/common';
import { config } from 'dotenv';
import { cleanEnv, str } from 'envalid';

config();

export const environment = cleanEnv(process.env, {
	ENVIRONMENT: str({
		choices: Object.values(Environments),
		default: Environments.PRODUCTION,
	}),
	PORT: str(),
	SERVICES_BOUNCER_URL: str(),
});

// TODO: Add the below variables to your .env file for local development
// ENVIRONMENT=development
// GOOGLE_APPLICATION_CREDENTIALS="src/configs/firebase-service-account.json"
// PORT=1001
