import type { ApiSpecification } from "../shared/ApiSpecification";

type Handler<Type extends ApiSpecification[keyof ApiSpecification]> = (
	request: Type["request"],
) => Promise<Type["response"]>;

type AllHandlers = {
	[Endpoint in keyof ApiSpecification]: Handler<ApiSpecification[Endpoint]>;
};

type BunHandler = (request: Request) => Promise<Response>;

function generateHandler<Endpoint extends keyof ApiSpecification>(
	endpoint: Endpoint,
	handler: Handler<ApiSpecification[Endpoint]>,
): BunHandler {
	return async (request: Request) => {
		const requestBody =
			(await request.json()) as ApiSpecification[Endpoint]["request"];
		const response = await handler(requestBody);
		const headers = { "Content-Type": "application/json" };
		return new Response(JSON.stringify(response), {
			headers,
		});
	};
}
export function generateApiRoutes(handlers: AllHandlers) {
	const routes: Record<string, { POST: BunHandler }> = {};
	for (const endpoint of Object.keys(handlers) as (keyof AllHandlers)[]) {
		routes[`/api/${endpoint}`] = {
			POST: generateHandler(endpoint, handlers[endpoint]),
		};
	}
	return routes;
}
