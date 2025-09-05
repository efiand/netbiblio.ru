import { PROJECT_DESCRIPTION, PROJECT_TITLE } from "#common/constants.js";
import { html } from "#common/utils/mark-template.js";

export const mainRoute = {
	/** @type {RouteMethod} */
	async GET() {
		return {
			page: {
				heading: PROJECT_TITLE,
				description: PROJECT_DESCRIPTION,
				pageTemplate: html`
					<h2>Скоро открытие!</h2>
				`,
			},
		};
	},
};
