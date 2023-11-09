"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tests = void 0;
const event_handler_1 = require("./src/common/event.handler");
const tests_handler_1 = require("./src/tests/tests.handler");
exports.tests = (0, event_handler_1.APIGatewayEventHandler)(new tests_handler_1.default());
//# sourceMappingURL=handlers.js.map