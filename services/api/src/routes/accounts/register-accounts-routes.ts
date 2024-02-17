import { EndPoints } from '@repo/common';
import { FastifyInstance } from 'fastify';

import { getCustomToken } from '@/routes/accounts/handlers/authenticate';
import { createAccount } from '@/routes/accounts/handlers/create-account';
import { getAccountById } from '@/routes/accounts/handlers/get-account-by-id';
import { updateAccountById } from '@/routes/accounts/handlers/update-account-by-id';

export const registerAccountRoutes = (app: FastifyInstance) => {
	app.get(EndPoints.accounts.getById.url, getAccountById);
	app.patch(EndPoints.accounts.updateById.url, updateAccountById);
	app.post(EndPoints.accounts.getCustomToken.url, getCustomToken);
	app.put(EndPoints.accounts.create.url, createAccount);
};
