import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public reasons: ValidationError[]) {
    super('request param error');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.reasons.map(({ msg, param }) => ({
      message: msg,
      field: param,
    }));
  }
}
