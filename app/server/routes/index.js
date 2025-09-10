import { pagesApiRoute } from "#server/routes/api/pages.js";
import { telegramRoute } from "#server/routes/api/telegram.js";
import { mainRoute } from "#server/routes/main.js";
import { sitemapXmlRoute } from "#server/routes/sitemap-xml.js";

/** @type {{ [name: string]: Route }} */
export const routes = {
	"/": mainRoute,
	"/api/pages": pagesApiRoute,
	"/api/telegram": telegramRoute,
	"/sitemap.xml": sitemapXmlRoute,
};

/** @type {Set<string>} */
export const noAmpRoutes = new Set(["/api/pages", "/sitemap.xml"]);
