"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_entity_1 = require("../errors/errors.entity");
const errors_enum_1 = require("../errors/errors.enum");
const tests_service_1 = require("./tests.service");
class TestsHandler {
    async customError() {
        try {
            return await (0, tests_service_1.customErrorService)();
        }
        catch (error) {
            throw new errors_entity_1.BadGatewayError(error, 'warn', errors_enum_1.ReasonError.API_ERROR);
        }
    }
}
exports.default = TestsHandler;
//# sourceMappingURL=tests.handler.js.map