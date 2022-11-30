import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export const customExceptionFactory = (errors: ValidationError[]) => {
  const formattedErrors = errors.reduce((init: any, next: ValidationError) => {
    const { property, constraints = {} } = next;
    init[property] = Object.values(constraints);
    return init;
  }, {});

  const errorObject = {
    statusCode: HttpStatus.BAD_REQUEST,
    errors: formattedErrors,
    error: 'Bad Request',
  };

  return new HttpException(errorObject, HttpStatus.BAD_REQUEST);
};
