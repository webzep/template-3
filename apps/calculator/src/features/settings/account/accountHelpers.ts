import { CreateAccountRequestDto } from '@repo/common';
import { User } from 'firebase/auth';

import { Entity } from '@/core/entity/entitySlice';
import { RequestConfig } from '@/utils/createAsyncThunkFetch';

export const makeCreateAccountOptions = (
	user: User
): RequestConfig<CreateAccountRequestDto, void> => ({
	options: {
		body: {
			id: user.uid,
			profile: {
				displayName: user.displayName,
				email: user.email,
				givenName: user.displayName,
				surname: '',
			},
		},
	},
	pathId: user.uid,
});

export const makeGetAccountOptions = (
	user: User
): RequestConfig<void, void> => ({
	pathId: user.uid,
});

export const makeUpdateEntityOptions = <T extends Entity>(
	entity: T
): RequestConfig<T, void> => ({
	options: {
		body: entity,
	},
	pathId: entity.id,
});
