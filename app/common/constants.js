export const BASE_URL = "https://netbiblio.ru";

export const PROJECT_TITLE = "Netbiblio";

export const PROJECT_DESCRIPTION =
	"Электронное издательство «Netbiblio» — бесплатная веб-публикация Ваших произведений.";

export const version = {
	CSS: 1,
	JS: 1,
};

/** @type {Record<string, string>} */
export const STATIC_MIME_TYPES = {
	".js": "application/javascript; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".html": "text/html; charset=utf-8",
	".png": "image/png",
	".ico": "image/x-icon",
	".svg": "image/svg+xml; charset=utf-8",
	".txt": "plain/text; charset=utf-8",
	".webmanifest": "application/json; charset=utf-8",
	".webp": "image/webp",
	".woff2": "font/woff2",
};

/** @type {Set<string>} */
export const staticExtensions = new Set(Object.keys(STATIC_MIME_TYPES));
