import { loadCss, setScrollbarWidth } from "#client/lib/css.js";
import { initComments } from "#common/components/comments.js";
import { version } from "#common/constants.js";

setScrollbarWidth();

loadCss(`/${window.isDev ? "client/css" : "bundles"}/additional.css?v${version.CSS}`);

/** @type {NodeListOf<HTMLElement>} */
const hintedElements = document.querySelectorAll("[aria-label]");
hintedElements.forEach((element) => {
	element.title = element.ariaLabel || "";
});

/** @type {NodeListOf<HTMLDivElement>} */
const commentsElements = document.querySelectorAll(".comments");
// Гидратация блока комментариев
commentsElements.forEach(initComments);
