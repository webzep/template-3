import { createAsyncThunk } from '@reduxjs/toolkit';
import { mergeDeep } from '@repo/common';

import { environment } from '@/core/configs/environment';
import { AppState } from '@/core/store/reducers';
import {
	FetchOptions,
	FetchResponse,
	HttpMethod,
	httpRequest,
} from '@/utils/httpRequest';

export type RequestConfig<Body, Params> = {
	options?: FetchOptions<Body, Params>;
	pathId?: string;
	pathName?: string;
};

type CreateThunkConfig<Body, Params, ApiResponse> = {
	mapResponseBody?: (
		apiResponse: FetchResponse<ApiResponse>
	) => FetchResponse<ApiResponse>;
	requestConfig:
		| RequestConfig<Body, Params>
		| ((state: AppState) => Promise<RequestConfig<Body, Params>>);
	typePrefix: string;
};

const createAsyncThunkFetch =
	(type: HttpMethod) =>
	<
		Body,
		Params,
		ApiResponse,
		PayloadOverride = Partial<RequestConfig<Body, Params>>,
	>(
		thunkConfig: CreateThunkConfig<Body, Params, ApiResponse>
	) => {
		const { mapResponseBody, requestConfig, typePrefix } = thunkConfig;

		return createAsyncThunk(
			typePrefix,
			async (payload: PayloadOverride, thunkAPI) => {
				const state = thunkAPI.getState() as AppState;

				const thunkConfigToUse =
					typeof requestConfig === 'function'
						? await requestConfig(state)
						: requestConfig;
				const payloadToUse = mergeDeep<RequestConfig<Body, Params>>(
					{},
					thunkConfigToUse,
					payload ?? {}
				);

				const { options, pathId, pathName } = payloadToUse;
				const requestOptions: FetchOptions<Body, Params> = {
					body: options?.body,
					params: options?.params,
				};
				const optionsWithoutBody: FetchOptions<null, Params> = {
					headers: requestOptions.headers,
					params: requestOptions.params,
				};

				const url = `${environment.VITE_SERVICES_BOUNCER_URL}${pathName.replace(':id', pathId)}`;

				switch (type) {
					case HttpMethod.DELETE:
						return httpRequest
							.delete<
								Body,
								Params,
								ApiResponse
							>(url, requestOptions)
							.then((res) =>
								mapResponseBody ? mapResponseBody(res) : res
							);

					case HttpMethod.PATCH:
						return httpRequest
							.patch<
								Body,
								Params,
								ApiResponse
							>(url, requestOptions)
							.then((res) =>
								mapResponseBody ? mapResponseBody(res) : res
							);

					case HttpMethod.POST:
						return httpRequest
							.post<
								Body,
								Params,
								ApiResponse
							>(url, requestOptions)
							.then((res) =>
								mapResponseBody ? mapResponseBody(res) : res
							);

					case HttpMethod.PUT:
						return httpRequest
							.put<Body, Params, ApiResponse>(url, requestOptions)
							.then((res) =>
								mapResponseBody ? mapResponseBody(res) : res
							);

					default:
						return httpRequest
							.get<Params, ApiResponse>(url, optionsWithoutBody)
							.then((res) =>
								mapResponseBody ? mapResponseBody(res) : res
							);
				}
			}
		);
	};

const makeCreateAsyncThunkFetch =
	(type: HttpMethod) =>
	<
		Body,
		Params,
		ApiResponse,
		RequestConfigOverride = Partial<RequestConfig<Body, Params>> | void,
	>(
		thunkConfig: CreateThunkConfig<Body, Params, ApiResponse>
	) =>
		createAsyncThunkFetch(type)<
			Body,
			Params,
			ApiResponse,
			RequestConfigOverride
		>(thunkConfig);

export const createAsyncThunkFetchDelete = makeCreateAsyncThunkFetch(
	HttpMethod.DELETE
);

export const createAsyncThunkFetchGet = makeCreateAsyncThunkFetch(
	HttpMethod.GET
);

export const createAsyncThunkFetchPatch = makeCreateAsyncThunkFetch(
	HttpMethod.PATCH
);

export const createAsyncThunkFetchPost = makeCreateAsyncThunkFetch(
	HttpMethod.POST
);

export const createAsyncThunkFetchPut = makeCreateAsyncThunkFetch(
	HttpMethod.PUT
);
