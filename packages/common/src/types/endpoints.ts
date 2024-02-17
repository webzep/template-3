enum RequestType {
	'GET' = 'GET',
	'PATCH' = 'PATCH',
	'POST' = 'POST',
	'PUT' = 'PUT',
	'DELETE' = 'DELETE',
}

type EndPointMeta<T extends string> = {
	[key in T]: {
		type: RequestType;
		url: string;
	};
};

type HealthEndPoints = 'check';

type AccountsEndPoints = 'create' | 'getById' | 'updateById' | 'getCustomToken';

type RequestTypeItem = {
	accounts: EndPointMeta<AccountsEndPoints>;
	health: EndPointMeta<HealthEndPoints>;
};

export const EndPoints: RequestTypeItem = {
	accounts: {
		create: {
			type: RequestType.POST,
			url: '/accounts/:id',
		},
		getById: {
			type: RequestType.GET,
			url: '/accounts/:id',
		},
		getCustomToken: {
			type: RequestType.POST,
			url: '/accounts/getCustomToken',
		},
		updateById: {
			type: RequestType.PATCH,
			url: '/accounts/:id',
		},
	},
	health: {
		check: {
			type: RequestType.GET,
			url: '/health/check',
		},
	},
};
