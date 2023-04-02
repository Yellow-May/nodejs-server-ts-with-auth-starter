import { StatusCodes } from 'http-status-codes';

// custom api errror constructor
class CustomAPIError extends Error {
	statusCode: StatusCodes;
	constructor(message: string) {
		super(message);
		this.statusCode = StatusCodes.OK;
	}
}

// bad request error
class BadRequestError extends CustomAPIError {
	constructor(message: string) {
		super(message);
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

// 404 not found error
class NotFoundError extends CustomAPIError {
	constructor(message: string) {
		super(message);
		this.statusCode = StatusCodes.NOT_FOUND;
	}
}

// unauthorized error
class UnAuthorizedError extends CustomAPIError {
	constructor(message: string) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

// unacceptable error
class UnAcceptableError extends CustomAPIError {
	constructor(message: string) {
		super(message);
		this.statusCode = StatusCodes.NOT_ACCEPTABLE;
	}
}

export default CustomAPIError;
export { BadRequestError, NotFoundError, UnAuthorizedError, UnAcceptableError };
