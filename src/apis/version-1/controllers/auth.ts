import type { Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import StatusCodes from 'http-status-codes';
import {
	BadRequestError,
	UnAcceptableError,
	UnAuthorizedError,
} from '../../../configs/errors';
import { AdminModel, TokenModel } from '../../../models';
import { attachCookie, retreiveCookie } from '../helpers/functions/cookies';
import {
	createTokens,
	createAccessToken,
	verifyRefreshToken,
} from '../helpers/functions/tokens';

const LOGIN_USER = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (typeof email !== 'string' || typeof password !== 'string')
		throw new BadRequestError('Please provide all credentials');

	const user = await AdminModel.findOne({ email });
	if (user === null) throw new UnAcceptableError('No user with such email');

	const isCorrect = await user.comparePassword(password);
	if (!isCorrect) throw new UnAcceptableError('Incorrect password');

	const { accessToken, refreshToken } = createTokens({
		_id: user._id as unknown as string,
	});
	const userAgent = req.headers['user-agent'];
	const cookie = retreiveCookie(req);
	const browserId = uuidV4();

	if (cookie.browserId !== undefined) {
		const savedToken = await TokenModel.findOneAndUpdate(
			{ browserId: cookie.browserId, user: user._id },
			{ $set: { refreshToken } }
		);
		if (savedToken !== null)
			await TokenModel.create({
				browserId: cookie.browserId,
				user: user._id,
				refreshToken,
			});
		attachCookie(res, { refreshToken, browserId: cookie.browserId });
	} else {
		await TokenModel.create({
			refreshToken,
			userAgent,
			browserId,
			userId: user._id,
		});
		attachCookie(res, { refreshToken, browserId });
	}

	res.status(StatusCodes.OK).json({
		message: 'You have logged in',
		user: {
			_id: user._id,
			email: user.email,
		},
		token: accessToken,
	});
};

const LOGOUT_USER = async (req: Request, res: Response) => {
	const { refreshToken, browserId } = retreiveCookie(req);
	await TokenModel.findOneAndUpdate(
		{ refreshToken, browserId },
		{ $set: { refreshToken: '' } }
	);

	attachCookie(res, { refreshToken: ' ', browserId: browserId ?? '' });
	res.status(StatusCodes.OK).json({ message: 'You have been logged out' });
};

const REFRESH_TOKEN = async (req: Request, res: Response) => {
	const { refreshToken } = retreiveCookie(req);
	if (refreshToken === undefined)
		throw new UnAuthorizedError('Session expired');

	const { _id } = verifyRefreshToken(refreshToken);
	const accessToken = createAccessToken({ _id });
	const user = await AdminModel.findById(_id).select('username role profile');

	res.status(200).json({ user, token: accessToken });
};

export { LOGIN_USER, LOGOUT_USER, REFRESH_TOKEN };
