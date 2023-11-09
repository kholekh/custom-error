"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customErrorService = void 0;
const customErrorService = async () => {
    // throw new UnauthorizedError('Unauthorized Error');
    throw new Error(`Simple Error!`);
    // throw 'String Error!';
};
exports.customErrorService = customErrorService;
//# sourceMappingURL=tests.service.js.map