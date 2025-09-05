import { renderFooter } from "#common/components/footer.js";
import { renderHeader } from "#common/components/header.js";
import { YANDEX_METRIKA_TEMPLATE } from "#common/lib/yandex-metrika.js";
import { html } from "#common/utils/mark-template.js";

/** @type {(data: LayoutData) => string} */
export function renderLayout({ heading, isAmp, isDev, next, pathname, pageTemplate, prev }) {
	const ampPrefix = isAmp ? "/amp" : "";
	const tocUrl = `${ampPrefix}/`;

	return html`
		<body>
      ${isAmp || isDev ? "" : YANDEX_METRIKA_TEMPLATE}

			${renderHeader(tocUrl)}

      <main>
        <h1>${heading}</h1>
        ${pageTemplate}
      </main>

			${renderFooter({ ampPrefix, next, prev, tocUrl: pathname === "/" ? "" : tocUrl })}
		</body>
	`;
}
