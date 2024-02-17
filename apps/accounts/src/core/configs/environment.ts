import { Environments } from '@repo/common';
import { cleanEnv, str } from 'envalid';

export const environment = cleanEnv(import.meta.env, {
	VITE_APPS_ACCOUNTS_URL: str(),
	VITE_APPS_CALCULATOR_URL: str(),
	VITE_ENVIRONMENT: str({
		choices: Object.values(Environments),
		default: Environments.PRODUCTION,
	}),
	VITE_FIREBASE_API_KEY: str(),
	VITE_FIREBASE_APP_ID: str(),
	VITE_FIREBASE_MEASUREMENT_ID: str(),
	VITE_FIREBASE_MESSAGING_SENDER_ID: str(),
	VITE_FIREBASE_PROJECT_ID: str(),
	VITE_SERVICES_BOUNCER_URL: str(),
	VITE_WEBSITE_URL: str(),
});

// TODO: Add the below variables to your .env file
// VITE_ENVIRONMENT=development
// VITE_FIREBASE_API_KEY=
// VITE_FIREBASE_APP_ID=
// VITE_FIREBASE_MEASUREMENT_ID=
// VITE_FIREBASE_MESSAGING_SENDER_ID=
// VITE_FIREBASE_PROJECT_ID=
// VITE_SERVICES_BOUNCER_URL=http://localhost:1001
// VITE_APPS_ACCOUNTS_URL=http://localhost:2000
// VITE_APPS_CALCULATOR_URL=http://localhost:2001
// VITE_WEBSITE_URL=https://template-3.com
