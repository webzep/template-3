import { Environments } from '@repo/common';

export const corsWhitelistMap: Record<Environments, string[]> = {
	[Environments.DEVELOPMENT]: ['http://localhost:2001'],
	[Environments.PRODUCTION]: ['https://legioneer-app.vercel.app/'],
};
