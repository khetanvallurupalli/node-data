const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, printf} = format;

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}-${process.env.NODE_ENV}] ${info.level}: ${info.message}`;
});

const logger = createLogger({
    format: combine(
        label({ label: 'Database_Manager_Service' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: 'logs'})
    ]
});

module.exports = {
    logger
}
