import { FastifyInstance } from 'fastify';

import { registerAccountRoutes } from '@/routes/accounts/register-accounts-routes';
import { registerHealthRoutes } from '@/routes/health/register-health-routes';

export const registerRoutes = (app: FastifyInstance) => {
	registerAccountRoutes(app);
	registerHealthRoutes(app);
};
