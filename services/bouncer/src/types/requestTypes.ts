import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';

type ApiRequest<Body = void, Params = void> = FastifyRequest<
	RouteGenericInterface & {
		Body: Body;
		Params: Params;
	}
>;

// TODO: Figure out how to make this work with generics
type ApiReply<Payload> = FastifyReply & {
	data?: Payload;
	message?: string;
};

export type DeleteRequestHandler<ReplyPayload> = (
	request: ApiRequest<void, { id: string }>,
	response: ApiReply<ReplyPayload>
) => Promise<ApiReply<ReplyPayload>>;

export type GetRequestHandler<ReplyPayload> = (
	request: ApiRequest<void, { id: string }>,
	response: ApiReply<ReplyPayload>
) => Promise<ApiReply<ReplyPayload>>;

export type PostRequestHandler<Payload, ReplyPayload> = (
	request: ApiRequest<Payload>,
	response: ApiReply<ReplyPayload>
) => Promise<ApiReply<ReplyPayload>>;

export type PatchRequestHandler<Payload, ReplyPayload> = (
	request: ApiRequest<Payload>,
	response: ApiReply<ReplyPayload>
) => Promise<ApiReply<ReplyPayload>>;

export type PutRequestHandler<Payload, ReplyPayload> = (
	request: ApiRequest<Payload>,
	response: ApiReply<ReplyPayload>
) => Promise<ApiReply<ReplyPayload>>;
