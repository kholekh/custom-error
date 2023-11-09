"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("./handlers");
Error.prototype.name = `Custom Error!`;
const action = 'customError';
const event = {
    body: '',
    headers: {},
    multiValueHeaders: {},
    httpMethod: 'POST',
    isBase64Encoded: false,
    path: `/tests/${action}`,
    pathParameters: {
        action,
    },
    queryStringParameters: {},
    multiValueQueryStringParameters: undefined,
    stageVariables: undefined,
    requestContext: undefined,
    resource: ""
};
const context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: "",
    functionVersion: "",
    invokedFunctionArn: "",
    memoryLimitInMB: "",
    awsRequestId: "",
    logGroupName: "",
    logStreamName: "",
    getRemainingTimeInMillis: function () {
        throw new Error("Function not implemented.");
    },
    done: function (error, result) {
        throw new Error("Function not implemented.");
    },
    fail: function (error) {
        throw new Error("Function not implemented.");
    },
    succeed: function (messageOrObject) {
        throw new Error("Function not implemented.");
    }
};
const callback = (err, res) => {
    if (err)
        return console.error(err.stack);
    return console.log(res);
};
(0, handlers_1.tests)(event, context, callback);
//# sourceMappingURL=main.js.map