import { sql } from "#common/utils/mark-template.js";
import { processDb } from "#server/lib/db.js";
import { upload } from "#server/lib/yandex-disk.js";

/** @type {DbTable[]} */
const SQL_TABLES = ["authors", "books", "comments", "genres", "works"];

/** @type {DbTable[]} */
const SQL_TABLES_FOR_DELETING = ["comments", "works", "books", "authors", "genres"];

const SQL_PREPEND = SQL_TABLES_FOR_DELETING.map((table) => sql`DELETE FROM ${table};\n`).join("");

/** @type {(tableName: DbTable, rows: object[]) => string} */
function createEntityDump(tableName, rows) {
	if (!rows.length) {
		return "";
	}
	const values = rows.map((row) => Object.values(row).map(stringifyCell).join(", ")).join("),\n(");
	const columns = Object.keys(rows[0]).join(", ");

	return sql`INSERT INTO ${tableName} (${columns}) VALUES\n(${values});`;
}

export async function dump() {
	const entities = await Promise.all(SQL_TABLES.map((table) => processDb(sql`SELECT * FROM ${table} ORDER BY id`)));

	const dumpedEntities = entities.map((entity, i) => createEntityDump(SQL_TABLES[i], entity)).filter(Boolean);
	const dataJson = entities.reduce((acc, entity, i) => {
		acc[SQL_TABLES[i]] = entity;
		return acc;
	}, {});

	const filename = `dump/${Date.now()}`;

	await Promise.all([
		upload(`${filename}.json`, JSON.stringify(dataJson)),
		upload(`${filename}.sql`, `${SQL_PREPEND}\n${dumpedEntities.join("\n\n")}`),
	]);
}

/**
 *
 * @param {boolean | Buffer | Date | null | number | string} value
 * @return {string}
 */
function stringifyCell(value) {
	if (value === null) {
		return "null";
	}

	if (typeof value === "string") {
		// Особенности одинарных кавычек в SQL
		const safeValue = value.trim().replace(/(?<apos>')/gu, "$<apos>$<apos>");

		return `'${safeValue}'`;
	}

	if (value instanceof Date) {
		const data = value.toISOString().replace("T", " ").slice(0, -1);

		return `'${data}'`;
	}

	if (value instanceof Buffer) {
		return value.toString();
	}

	return `${value}`;
}
