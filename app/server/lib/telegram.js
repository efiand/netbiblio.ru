import TelegramBot from "node-telegram-bot-api";

const { TG_ADMIN_ID, TG_TOKEN } = process.env;

const bot = new TelegramBot(TG_TOKEN);

/** @type {TelegramBot.SendMessageOptions} */
const messageOptions = { parse_mode: "Markdown" };

/** @type {(payload: TelegramPayload) => Promise<void>} */
export async function sendTgMessage({ chat: { id = TG_ADMIN_ID, username = "NetbiblioBot" } = {}, text }) {
	const template = `\`\`\`\n${JSON.stringify(text.trim())}\n\`\`\``;

	if (id === TG_ADMIN_ID) {
		await bot.sendMessage(id, template, messageOptions);
		return;
	}

	const user = username ? `@${username}` : id;
	await bot.sendMessage(TG_ADMIN_ID, `Сообщение от ${user}:\n${template}`, messageOptions);

	const answer =
		text === "/start"
			? "Доброго времени суток! Мы готовы ответить на Ваши вопросы."
			: `Вы писали нам:\n${template}\nСпасибо за обращение! Наш администратор ответит Вам в ближайшее время.`;
	const addition = username ? "" : "\nЛогин в telegram отсутствует. Пожалуйста, пришлите ссылку для обратной связи.";

	await bot.sendMessage(id, `${answer}${addition}`, messageOptions);
}
