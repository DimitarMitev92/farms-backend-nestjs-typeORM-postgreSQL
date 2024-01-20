import { BaseExceptionFilter } from '@nestjs/core';
import { Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
