import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../configs/errors';

const ErrorsHandler = (
	err: Error | CustomAPIError | any,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	let errorObj = {
		statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
		message: `There was an internal error, Try again later`,
	};

	if (err instanceof CustomAPIError) {
		errorObj = {
			statusCode: err?.statusCode,
			message: err?.message,
		};
	}

	if (err?.code === 11000) {
		const val: string = err?.keyValue.username ?? err.keyValue?.email;
		const key = err?.keyValue?.username !== null ? 'username' : 'email';
		const message = `${key} ${val} has been used`;
		errorObj = {
			statusCode: StatusCodes.BAD_REQUEST,
			message,
		};
	}

	if (err?.name === 'CastError') {
		errorObj = {
			statusCode: StatusCodes.BAD_REQUEST,
			message: 'invalid id',
		};
	}

	if (err?.name === 'ValidationError') {
		const error = err?.errors?.status ?? err?.errors?.userId;
		errorObj = {
			statusCode: StatusCodes.BAD_REQUEST,
			message: error?.message,
		};
	}

	if (err?.name === 'JsonWebTokenError') {
		errorObj = {
			statusCode: StatusCodes.UNAUTHORIZED,
			message: err?.message,
		};
	}

	const { statusCode, message } = errorObj;
	res.status(statusCode).json({ message, statusCode, err });
	next();
};

export default ErrorsHandler;
