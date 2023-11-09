import { ReasonError, HttpCode } from "./errors.enum";

export type LogLevel = 'info' | 'debug' | 'warn' | 'error' | 'critical';

export class HttpError extends Error {
  readonly code: HttpCode;
  readonly logLevel: LogLevel;
  readonly reason?: ReasonError;
  readonly cause?: string;

  constructor (
    code: HttpCode,
    err: any,
    logLevel: LogLevel = 'error',
    reason?: ReasonError,
  ) {
    console.log({code, error: err, level: logLevel, reason: reason && ReasonError[reason]});

    if ( typeof err === 'string' ) {
      super(err);
    } else if ( err instanceof Error ) {
      super(err.message);
      // const [name, ...path] = this.stack.split(':');
      console.log(err.stack);
      // super.stack = [this.constructor.name, ...path].join(':');
      this.cause = err.stack;
    } else {
      super(JSON.stringify(err ?? 'Something went wrong!'));
    };
    super.name = this.constructor.name;

    this.logLevel = logLevel;
    this.reason = reason;
    this.code = code;
  }
}

/**
 * extends the HttpError class with the specified http code
 * @param {HttpCode} code http code
 * @returns class with the specified http code
*/
function createHttpError(code: HttpCode) {
  return class extends HttpError {
    constructor(err: any, logLevel?: LogLevel, reason?: ReasonError) {
      const levelByCode: LogLevel = code < 500 ? 'warn' : 'error';
      super(code, err, logLevel || levelByCode, reason);
    }
  };
}

export class BadRequestError extends createHttpError(HttpCode.BAD_REQUEST) {}
export class UnauthorizedError extends createHttpError(HttpCode.UNAUTHORIZED) {}
export class ForbiddenError extends createHttpError(HttpCode.FORBIDDEN) {}
export class NotFoundError extends createHttpError(HttpCode.NOT_FOUND) {}
export class UnprocessableEntityError extends createHttpError(HttpCode.UNPROCESSABLE_ENTITY) {}
export class FailedDependencyError extends createHttpError(HttpCode.FAILED_DEPENDENCY) {}
export class InternalServerError extends createHttpError(HttpCode.INTERNAL_SERVER_ERROR) {}
export class BadGatewayError extends createHttpError(HttpCode.BAD_GATEWAY) {}
