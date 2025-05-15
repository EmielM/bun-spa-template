export type ApiSpecification = {
	hello: {
		request: { name: string };
		response: {
			greeting: string;
		};
	};
};
