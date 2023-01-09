import { ConsoleLogger } from '@nestjs/common';
import { error, info } from './log4js';

class Logger extends ConsoleLogger {
  /**
   * Write a 'log' level log.
   */
  log(message: any, context?: string) {
    info(message)
    super.log(message, context);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, stack?: string, context?: string) {
    error(stack)
    super.error(message, stack, context);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, context?: string) {
    super.warn(message, context);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, context?: string) {
    super.debug(message, context);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, context?: string) {
    super.verbose(message, context);
  }
}

export default new Logger();