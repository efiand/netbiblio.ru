export const pagesApiRoute = {
	/** @type {RouteMethod} */
	async GET() {
		// TODO pages
		/** @type {string[]} */
		const pages = [];

		pages.push("/");

		return {
			contentType: "application/json",
			template: JSON.stringify(pages),
		};
	},
};
