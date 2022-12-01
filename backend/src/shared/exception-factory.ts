import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export const customExceptionFactory = (errors: ValidationError[]) => {
  const errorObject = {
    statusCode: HttpStatus.BAD_REQUEST,
    errors: {},
    error: 'Bad Request',
  };

  errors.reduce((init: any, next: ValidationError) => {
    const { property, constraints = {} } = next;
    init[property] = Object.values(constraints);
    return init;
  }, errorObject.errors);

  return new HttpException(errorObject, HttpStatus.BAD_REQUEST);
};
