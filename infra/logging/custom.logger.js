const winston = require("winston");
const { combine, timestamp, label, printf } = winston.format;

module.exports = class CustomLogger {
  constructor() {
    // this.logger = winston.createLogger();
  }

  initLogger = (labelMethod) => {
    const logger = winston.createLogger({
      level: "silly",
      format: combine(
        label({ label: labelMethod }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        printf(({ level, message, label, timestamp }) => {
          return `${timestamp} [${label}] ${level}: ${message}`;
        })
      ),
      transports: [new winston.transports.Console()],
    });
    // logger.configure({
    //   level: "silly",
    //   format: combine(
    //     label({ label: labelMethod }),
    //     timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    //     printf(({ level, message, label, timestamp }) => {
    //       return `${timestamp} [${label}] ${level}: ${message}`;
    //     })
    //   ),
    //   transports: [new winston.transports.Console()],
    // });
    return {
      info: (message) => {
        logger.info(JSON.stringify(message));
        return;
      },
      warn: (message) => {
        logger.warn(JSON.stringify(message));
        return;
      },
      error: (message) => {
        logger.error(JSON.stringify(message));
        return;
      },
    };
  };
};
