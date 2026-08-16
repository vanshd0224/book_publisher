import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_SERVER_ERROR';
    let message = 'An unexpected internal error occurred';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resObj = exceptionResponse as any;
        message = Array.isArray(resObj.message)
          ? resObj.message.join('; ')
          : resObj.message || exception.message;
        code = resObj.error || exception.name || 'BAD_REQUEST';
      }
    } else if (exception?.name === 'PrismaClientKnownRequestError') {
      status = HttpStatus.BAD_REQUEST;
      code = 'DATABASE_ERROR';
      message = `Database operation failed: ${exception.message}`;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    this.logger.error(`Http Status: ${status} Error Code: ${code} Message: ${message}`, exception.stack);

    response.status(status).json({
      success: false,
      error: {
        code,
        message,
      },
    });
  }
}
