export enum HttpMethod {
	DELETE = 'DELETE',
	GET = 'GET',
	PATCH = 'PATCH',
	POST = 'POST',
	PUT = 'PUT',
}

export type FetchOptions<Body, FetchParams = null> = {
	body?: Body;
	headers?: HeadersInit;
	params?: FetchParams;
};

export type FetchParams = URLSearchParams;

export type FetchResponse<ApiResponse = null> = {
	bodyUsed: boolean;
	data: ApiResponse;
	headers: Headers;
	message: string;
	ok: boolean;
	redirected: boolean;
	status: number;
	statusText: string;
	type: ResponseType;
	url: string;
};

const requestWithoutBody =
	(method: HttpMethod) =>
	async <FetchParams = null, ApiResponse = null>(
		url: string,
		options: FetchOptions<null, FetchParams> = {}
	) =>
		request<null, FetchParams, ApiResponse>(url, method, options);

const requestWithBody =
	(method: HttpMethod) =>
	async <Body = null, FetchParams = null, ApiResponse = null>(
		url: string,
		options: FetchOptions<Body, FetchParams>
	) =>
		request<Body, FetchParams, ApiResponse>(url, method, options);

const request = async <Body = null, FetchParams = null, ApiResponse = null>(
	url: string,
	method: string,
	options?: FetchOptions<Body, FetchParams>
): Promise<FetchResponse<ApiResponse>> => {
	const fetchOptions: RequestInit = {
		method: method,
	};

	if (options?.body) {
		fetchOptions.headers = { 'Content-Type': 'application/json' };
		fetchOptions.body = JSON.stringify(options.body);
	}

	if (options?.headers) {
		fetchOptions.headers = { ...fetchOptions.headers, ...options.headers };
	}

	if (options?.params) {
		const parsedParams = Object.fromEntries(
			Object.entries(options.params).map(([key, value]) => [
				key,
				JSON.stringify(value),
			])
		);
		url = `${url}?${new URLSearchParams(parsedParams).toString()}`;
	}

	const response = await fetch(url, fetchOptions);
	const { data, message } = await response.json();

	return {
		bodyUsed: response.bodyUsed,
		data,
		headers: response.headers,
		message,
		ok: response.ok,
		redirected: response.redirected,
		status: response.status,
		statusText: response.statusText,
		type: response.type,
		url: response.url,
	};
};

export const httpRequest = {
	delete: requestWithBody(HttpMethod.DELETE),
	get: requestWithoutBody(HttpMethod.GET),
	patch: requestWithBody(HttpMethod.PATCH),
	post: requestWithBody(HttpMethod.POST),
	put: requestWithBody(HttpMethod.PUT),
};
