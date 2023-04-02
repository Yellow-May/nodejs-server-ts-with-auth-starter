import type { Request, Response } from 'express';
import type { CookiePayload } from '../types/payload';

const REFRESH_COOKIE_NAME = process.env.REFRESH_COOKIE_NAME as string;
const BROWSER_COOKIE_NAME = process.env.BROWSER_COOKIE_NAME as string;

const attachCookie = (res: Response, payload: CookiePayload) => {
	res.cookie(BROWSER_COOKIE_NAME, payload.browserId, {
		maxAge: 1000 * 60 * 60 * 24 * 90,
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax',
	});
	res.cookie(REFRESH_COOKIE_NAME, payload.refreshToken, {
		maxAge: payload.refreshToken === ' ' ? 1 : 1000 * 60 * 60 * 24 * 2,
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax',
	});
};

const retreiveCookie = (req: Request) => {
	const refreshToken: string | undefined = req.cookies[REFRESH_COOKIE_NAME];
	const browserId: string | undefined = req.cookies[BROWSER_COOKIE_NAME];

	return {
		refreshToken,
		browserId,
	};
};

export { attachCookie, retreiveCookie };
