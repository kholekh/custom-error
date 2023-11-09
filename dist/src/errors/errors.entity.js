"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadGatewayError = exports.InternalServerError = exports.FailedDependencyError = exports.UnprocessableEntityError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.HttpError = void 0;
const errors_enum_1 = require("./errors.enum");
class HttpError extends Error {
    constructor(code, err, logLevel = 'error', reason) {
        console.log({ code, error: err, level: logLevel, reason: reason && errors_enum_1.ReasonError[reason] });
        if (typeof err === 'string') {
            super(err);
        }
        else if (err instanceof Error) {
            super(err.message);
            // const [name, ...path] = this.stack.split(':');
            console.log(err.stack);
            // super.stack = [this.constructor.name, ...path].join(':');
            this.cause = err.stack;
        }
        else {
            super(JSON.stringify(err ?? 'Something went wrong!'));
        }
        ;
        super.name = this.constructor.name;
        this.logLevel = logLevel;
        this.reason = reason;
        this.code = code;
    }
}
exports.HttpError = HttpError;
/**
 * extends the HttpError class with the specified http code
 * @param {HttpCode} code http code
 * @returns class with the specified http code
*/
function createHttpError(code) {
    return class extends HttpError {
        constructor(err, logLevel, reason) {
            const levelByCode = code < 500 ? 'warn' : 'error';
            super(code, err, logLevel || levelByCode, reason);
        }
    };
}
class BadRequestError extends createHttpError(errors_enum_1.HttpCode.BAD_REQUEST) {
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends createHttpError(errors_enum_1.HttpCode.UNAUTHORIZED) {
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends createHttpError(errors_enum_1.HttpCode.FORBIDDEN) {
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends createHttpError(errors_enum_1.HttpCode.NOT_FOUND) {
}
exports.NotFoundError = NotFoundError;
class UnprocessableEntityError extends createHttpError(errors_enum_1.HttpCode.UNPROCESSABLE_ENTITY) {
}
exports.UnprocessableEntityError = UnprocessableEntityError;
class FailedDependencyError extends createHttpError(errors_enum_1.HttpCode.FAILED_DEPENDENCY) {
}
exports.FailedDependencyError = FailedDependencyError;
class InternalServerError extends createHttpError(errors_enum_1.HttpCode.INTERNAL_SERVER_ERROR) {
}
exports.InternalServerError = InternalServerError;
class BadGatewayError extends createHttpError(errors_enum_1.HttpCode.BAD_GATEWAY) {
}
exports.BadGatewayError = BadGatewayError;
//# sourceMappingURL=errors.entity.js.map