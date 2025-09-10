import { BASE_URL } from "#common/constants.js";
import { xml } from "#common/utils/mark-template.js";

const SERVICE_PAGES = [""];

/** @type {(lastmod?: string) => Changefreq} */
function getChangefreq(lastmod) {
	if (!lastmod) {
		return undefined;
	}

	const daysAfterMod = Math.floor((Date.now() - new Date(lastmod).valueOf()) / 86_400_000);

	if (daysAfterMod < 1) {
		return "daily";
	}
	if (daysAfterMod < 7) {
		return "weekly";
	}
	if (daysAfterMod < 30) {
		return "monthly";
	}
	if (daysAfterMod < 365) {
		return "yearly";
	}
	return undefined;
}

/** @type {(data: SitemapPage) => string} */
function renderPage({ lastmod, loc, priority }) {
	const changefreq = getChangefreq(lastmod);

	return xml`
		<url>
			<loc>${loc}</loc>
			${priority ? xml`<priority>${priority}</priority>` : ""}
			${changefreq ? xml`<changefreq>${changefreq}</changefreq>` : ""}
			${lastmod ? xml`<lastmod>${lastmod}</lastmod>` : ""}
		</url>
	`;
}

export const sitemapXmlRoute = {
	/** @type {RouteMethod} */
	async GET() {
		// TODO pages
		/** @type {SitemapPage[]} */
		const pages = SERVICE_PAGES.map((page) => ({ priority: "0.8", loc: `${BASE_URL}${page}` }));

		return {
			contentType: "application/xml",
			template: xml`
				<?xml version="1.0" encoding="UTF-8" ?>
				<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml">
					${pages.map(renderPage).join("")}
				</urlset>
			`,
		};
	},
};
