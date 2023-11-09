import { BadGatewayError } from "../errors/errors.entity";
import { ReasonError } from "../errors/errors.enum";
import { customErrorService } from "./tests.service";

export default class TestsHandler {
  async customError() {
    try {
      return await customErrorService();
    } catch (error) {
      throw new BadGatewayError(error, 'warn', ReasonError.API_ERROR);
    }
  }
}
