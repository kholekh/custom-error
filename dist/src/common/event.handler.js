"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIGatewayEventHandler = void 0;
const crypto_1 = require("crypto");
const errors_entity_1 = require("../errors/errors.entity");
const errors_enum_1 = require("../errors/errors.enum");
/**
 * Create an API Gateway event handler
 * @param {EventHandlers} eventHandlers pure event handlers (no callback)
 * @returns {APIGatewayEventHandler} API Gateway event handler with callback
*/
function APIGatewayEventHandler(eventHandlers) {
    return async (event, context, callback) => {
        const requestId = event.requestContext?.requestId || (0, crypto_1.randomUUID)();
        const logRequest = `REQUEST: ${requestId}, METHOD: ${event.httpMethod}, PATH: ${event.path}, BODY: ${event.body}, HEADERS: ${JSON.stringify(event.headers)}`;
        console.log(logRequest);
        try {
            if (!event.pathParameters)
                throw new errors_entity_1.BadGatewayError('The path parameters is missing for this event!', 'error');
            const { action } = event.pathParameters;
            if (!action)
                throw new errors_entity_1.BadGatewayError('The action is missing for this event!', 'error');
            console.log(`ACTION: `, action);
            const eventHandler = eventHandlers[action];
            const result = await eventHandler(event, context);
            const logResponse = `RESPONSE: ${requestId}, STATUS: ${result?.statusCode}, BODY: ${result?.body}`;
            console.log(logResponse);
            return callback(null, result);
        }
        catch (error) {
            const { message, stack, statusCode, reason, logLevel, cause } = (() => {
                if (error instanceof errors_entity_1.HttpError) {
                    const { message, stack, code, reason, logLevel, cause } = error;
                    return { message, stack, statusCode: code, reason, logLevel, cause };
                }
                if (error instanceof Error) {
                    const { message, stack } = error;
                    return {
                        message, stack, statusCode: errors_enum_1.HttpCode.INTERNAL_SERVER_ERROR, reason: undefined, logLevel: 'error'
                    };
                }
                return {
                    message: JSON.stringify(error ?? 'Something went wrong!'),
                    stack: undefined,
                    statusCode: errors_enum_1.HttpCode.INTERNAL_SERVER_ERROR,
                    reason: undefined,
                    logLevel: 'critical',
                };
            })();
            console.log(`STACK: `, stack);
            console.log(`CAUSE: `, cause);
            const body = JSON.stringify({ result: false, error: message, reason });
            return callback(null, { statusCode, body });
        }
    };
}
exports.APIGatewayEventHandler = APIGatewayEventHandler;
//# sourceMappingURL=event.handler.js.map