declare global {
	import type { IncomingMessage, ServerResponse } from "node:http";
	import type formidable from "formidable";

	interface Window {
		isDev?: boolean;
	}

	namespace NodeJS {
		interface ProcessEnv {
			DB_HOST: string;
			DB_NAME: string;
			DB_PASSWORD: string;
			DB_USER: string;
			DEV?: string;
			PORT: string;
			TG_ADMIN_ID: string;
			TG_TOKEN: string;
			YADISK_TOKEN: string;
		}
	}

	type WorkComment = {
		answer: string | null;
		name: string;
		text: string;
	};

	type DbItem = {
		id: number;
		title: string;
	};

	type Changefreq = "daily" | "weekly" | "monthly" | "yearly" | undefined;

	type ComponentInitiator = (element: HTMLElement) => void;

	type DbTable = "authors" | "books" | "comments" | "genres" | "works";

	type LayoutDataBase = {
		isAmp?: boolean;
		isDev?: boolean;
		pageTemplate?: string;
		pathname?: string;
	};

	type LayoutData = LayoutDataBase & {
		description?: string;
		headTemplate?: string;
		heading?: string;
		next?: string;
		ogImage?: string;
		prev?: string;
	};

	type ReqBody = Record<formidable.Files<string> | object | string>;

	type Route = {
		[method: IncomingMessage["method"]]: RouteMethod;
	};

	type RouteData = {
		contentType?: string;
		page?: LayoutData;
		template?: string;
	};

	type RouteMethod = (params: RouteParams) => Promise<RouteData>;

	type RouteParams = {
		body: ReqBody;
		id: number;
		isAmp: boolean;
		req: RouteRequest;
		res: RouteResponse;
	};

	type RouteRequest = IncomingMessage;

	type RouteResponse = ServerResponse<IncomingMessage> & { req: IncomingMessage };

	type ServerMiddleware = (req: IncomingMessage, res: RouteResponse, next?: ServerMiddleware) => Promise<void>;

	type SitemapPage = {
		lastmod?: string;
		loc: string;
		priority?: string;
	};

	type TelegramPayload = {
		chat?: {
			id?: string | number;
			username?: string;
		};
		text: string;
	};
}

export {};
