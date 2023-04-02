import jwt from 'jsonwebtoken';
import type { TokenPayload } from '../types/payload';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

const createAccessToken = (payload: TokenPayload) => {
	return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '10m' });
};

const createRefreshToken = (payload: TokenPayload) => {
	return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '2 days' });
};

const createTokens = (payload: TokenPayload) => {
	return {
		accessToken: createAccessToken(payload),
		refreshToken: createRefreshToken(payload),
	};
};

const verifyRefreshToken = (token: string) => {
	const payload = jwt.verify(token, REFRESH_SECRET);
	return payload as TokenPayload;
};

const verifyAccessToken = (token: string) => {
	const payload = jwt.verify(token, ACCESS_SECRET);
	return payload as TokenPayload;
};

export {
	createAccessToken,
	createRefreshToken,
	createTokens,
	verifyAccessToken,
	verifyRefreshToken,
};
