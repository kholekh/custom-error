import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { tests } from "./handlers";

Error.prototype.name = `Custom Error!`;

const action = 'customError';

const event: APIGatewayProxyEvent = {
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

const context: Context = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: "",
  functionVersion: "",
  invokedFunctionArn: "",
  memoryLimitInMB: "",
  awsRequestId: "",
  logGroupName: "",
  logStreamName: "",
  getRemainingTimeInMillis: function (): number {
    throw new Error("Function not implemented.");
  },
  done: function (error?: Error, result?: any): void {
    throw new Error("Function not implemented.");
  },
  fail: function (error: string | Error): void {
    throw new Error("Function not implemented.");
  },
  succeed: function (messageOrObject: any): void {
    throw new Error("Function not implemented.");
  }
};

const callback = (err: Error, res: object) => {
  if (err) 
    return console.error(err.stack);
  
  return console.log(res);
}

tests(event, context, callback);

