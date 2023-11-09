import { APIGatewayEventHandler } from './src/common/event.handler';
import TestsHandler from './src/tests/tests.handler';

export const tests = APIGatewayEventHandler(new TestsHandler());
