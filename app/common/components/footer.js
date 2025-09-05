import { html } from "#common/utils/mark-template.js";

/** @type {(payload: { ampPrefix?: string; tocUrl?: string; next?: string; prev?: string }) => string} */
export function renderFooter({ ampPrefix = "", tocUrl = "", next, prev }) {
	const prevTemplate = prev
		? html`
				<li>
					<a
						class="nav-ring__link nav-ring__link--prev"
						rel="prev"
						href="${ampPrefix}${prev}/"
						aria-label="Назад"
					></a>
				</li>
			`
		: "";

	const tocTemplate = tocUrl
		? html`
				<li>
					<a class="nav-ring__link nav-ring__link--toc" rel="toc" href="${tocUrl}">
						Содержание
					</a>
				</li>
			`
		: "";

	const nextTemplate = next
		? html`
				<li>
					<a
						class="nav-ring__link nav-ring__link--next"
						rel="next"
						href="${ampPrefix}${next}/"
						aria-label="Далее"
					></a>
				</li>
			`
		: "";

	const navTemplate =
		prevTemplate || tocTemplate || nextTemplate
			? html`
			<nav>
				<ul class="nav-ring">
					${prevTemplate + tocTemplate + nextTemplate}
				</ul>
			</nav>
		`
			: "";

	return html`<footer>${navTemplate}</footer>`;
}
