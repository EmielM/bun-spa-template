import type { ApiSpecification } from "../shared/ApiSpecification";

export async function apiGet<EndpointT extends keyof ApiSpecification>(
	endpoint: EndpointT,
	request: ApiSpecification[EndpointT]["request"],
): Promise<ApiSpecification[EndpointT]["response"]> {
	const response = await fetch(`/api/${endpoint}`, {
		method: "POST",
		body: JSON.stringify(request),
	});
	const result =
		(await response.json()) as ApiSpecification[EndpointT]["response"];
	return result;
}
