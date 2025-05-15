import { serve } from "bun";

import clientIndex from "../client/index.html";
import { generateApiRoutes } from "./api";
import * as helloRoutes from "./hello";

const server = serve({
	routes: {
		"/": clientIndex,
		...generateApiRoutes({
			...helloRoutes,
		}),
	},
	development: true,
});

console.log(`Listening on ${server.url}`);
