const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    ],
    exceptionHandlers: [
        new winston.transports.Console({colorize: true, prettyPrint: true}),
    ],
    rejectionHandlers: [
        new winston.transports.Console({colorize: true, prettyPrint: true}),
    ]
});

if (process.env.NODE_ENV === 'production') {
    logger.add(new winston.transports.File({filename: 'combined.log'}));
    logger.exceptions.handle(
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );
    logger.rejections.handle(
        new winston.transports.File({ filename: 'rejections.log' })
    );
}

exports.logger = logger;