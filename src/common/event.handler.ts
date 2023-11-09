import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { randomUUID } from 'crypto';
import { BadGatewayError, HttpError, LogLevel } from '../errors/errors.entity';
import { HttpCode, ReasonError } from '../errors/errors.enum';

export interface EventHandlerResult {
  readonly statusCode: number;
  readonly body: string;
}

export type EventHandler = (
  event: APIGatewayEvent,
  context: Context
) => Promise<EventHandlerResult>;

type EventHandlers = Object;

type APIGatewayEventHandler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => void;

/**
 * Create an API Gateway event handler
 * @param {EventHandlers} eventHandlers pure event handlers (no callback)
 * @returns {APIGatewayEventHandler} API Gateway event handler with callback
*/
export function APIGatewayEventHandler(eventHandlers: EventHandlers): APIGatewayEventHandler {
  return async (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback<EventHandlerResult>
  ) => {
    const requestId = event.requestContext?.requestId || randomUUID();
    const logRequest = `REQUEST: ${requestId}, METHOD: ${event.httpMethod}, PATH: ${
      event.path
    }, BODY: ${event.body}, HEADERS: ${JSON.stringify(event.headers)}`;
    console.log(logRequest);

    try {
      if (!event.pathParameters)
        throw new BadGatewayError('The path parameters is missing for this event!', 'error');
      const { action } = event.pathParameters;
      if (!action) throw new BadGatewayError('The action is missing for this event!', 'error');
      console.log(`ACTION: `, action);
      const eventHandler = eventHandlers[action];
      const result = await eventHandler(event, context);
      const logResponse = `RESPONSE: ${requestId}, STATUS: ${result?.statusCode}, BODY: ${result?.body}`;

      console.log(logResponse);
      return callback(null, result);
    } catch (error) {
      const { message, stack, statusCode, reason, logLevel, cause } = ((): {
        message: string,
        stack?: string,
        statusCode: HttpCode,
        reason?: ReasonError,
        logLevel: LogLevel,
        cause?: string,
      } => {
        if (error instanceof HttpError) {
          const { message, stack, code, reason, logLevel, cause } = error;
          return {message, stack, statusCode: code, reason, logLevel, cause};
        }

        if (error instanceof Error) {
          const { message, stack } = error;
          return {
            message, stack, statusCode: HttpCode.INTERNAL_SERVER_ERROR, reason: undefined, logLevel: 'error'
          };
        }
        
        return { 
          message: JSON.stringify(error ?? 'Something went wrong!'),
          stack: undefined,
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          reason: undefined,
          logLevel: 'critical',
        };
      })();

      console.log(`STACK: `, stack);
      console.log(`CAUSE: `, cause);

      const body = JSON.stringify({result: false, error: message, reason});
      return callback(null, { statusCode, body });
    }
  };
}
