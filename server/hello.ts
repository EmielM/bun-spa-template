export async function hello({ name }: { name: string }) {
	return {
		greeting: `Hello ${name}!`,
	};
}
