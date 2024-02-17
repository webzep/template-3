import {
	AccountResponseDto,
	CreateAccountRequestDto,
	EndPoints,
	UpdateAccountRequestDto,
} from '@repo/common';

import {
	createAsyncThunkFetchGet,
	createAsyncThunkFetchPatch,
	createAsyncThunkFetchPost,
	createAsyncThunkFetchPut,
} from '@/utils/createAsyncThunkFetch';

export const getAuthToken = createAsyncThunkFetchPost<void, void, string>({
	requestConfig: {
		pathName: EndPoints.accounts.getCustomToken.url,
	},
	typePrefix: 'accounts/getAuthToken',
});

export const createAccount = createAsyncThunkFetchPut<
	CreateAccountRequestDto,
	void,
	AccountResponseDto
>({
	requestConfig: {
		pathName: EndPoints.accounts.create.url,
	},
	typePrefix: 'accounts/createAccount',
});

export const getAccountById = createAsyncThunkFetchGet<
	void,
	void,
	AccountResponseDto
>({
	requestConfig: {
		pathName: EndPoints.accounts.getById.url,
	},
	typePrefix: 'accounts/getAccountById',
});

export const updateAccountById = createAsyncThunkFetchPatch<
	UpdateAccountRequestDto,
	void,
	AccountResponseDto
>({
	requestConfig: {
		pathName: EndPoints.accounts.updateById.url,
	},
	typePrefix: 'accounts/updateAccountById',
});
