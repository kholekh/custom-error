import { UnauthorizedError } from "../errors/errors.entity"

export const customErrorService = async () => {
  // throw new UnauthorizedError('Unauthorized Error');
  throw new Error(`Simple Error!`);
  // throw 'String Error!';
}