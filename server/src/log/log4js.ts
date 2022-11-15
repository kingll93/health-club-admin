import * as log4js from 'log4js';

log4js.configure({
  appenders: {
    default: {
      type: 'dateFile',
      filename: `logs/info/info`, // 要打入到文件的位置
      pattern: 'yyyy-MM-dd.log', // 使用正则将日志分按天或者月分为不同文件
      alwaysIncludePattern: true, // 当为 true 时，log 文件名会包含之前设置的 pattern 信息 (默认为 false，但是强烈建议开启)
    },
    error: {
      type: 'dateFile',
      filename: `logs/error/error`, // 要打入到文件的位置
      pattern: 'yyyy-MM-dd.log', // 使用正则将日志分按天或者月分为不同文件
      alwaysIncludePattern: true, // 当为 true 时，log 文件名会包含之前设置的 pattern 信息 (默认为 false，但是强烈建议开启)
    },
  },
  categories: {
    default: {
      appenders: ['default'],
      level: 'info',
    },
    error: {
      appenders: ['error'],
      level: 'error',
    },
  },
});

const defaultLogger = log4js.getLogger('default');
const errorLogger = log4js.getLogger('error');

// info及以下级别的日志采用default策略，使用call函数改变this指向，否则会导致logger内部this指向报错
export function trace(message: any, ...args: any) {
  return defaultLogger.trace.call(defaultLogger, ...arguments);
}

export function debug(message: any, ...args: any) {
  return defaultLogger.debug.call(defaultLogger, ...arguments);
}

export function info(message: any, ...args: any) {
  return defaultLogger.info.call(defaultLogger, ...arguments);
}

// warn及以上的日志采用error策略
export function warn(message: any, ...args: any) {
  return errorLogger.warn.call(errorLogger, ...arguments);
}

export function error(message: any, ...args: any) {
  return errorLogger.error.call(errorLogger, ...arguments);
}

export function fatal(message: any, ...args: any) {
  return errorLogger.fatal.call(errorLogger, ...arguments);
}

export function mark(message: any, ...args: any) {
  return errorLogger.mark.call(errorLogger, ...arguments);
}
