import { Environments } from '@repo/common';

export const corsWhitelistMap: Record<Environments, string[] | null> = {
	[Environments.DEVELOPMENT]: ['http://localhost:2001'],
	[Environments.PRODUCTION]: ['https://template-3-app.vercel.app/'],
};
