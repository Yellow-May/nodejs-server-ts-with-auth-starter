import type { JwtPayload } from 'jsonwebtoken';

interface CookiePayload {
	refreshToken?: string;
	accessToken?: string;
	browserId?: string;
}

interface TokenPayload extends JwtPayload {
	_id: string;
}

export type { CookiePayload, TokenPayload };
