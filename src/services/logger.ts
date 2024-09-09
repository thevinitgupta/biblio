import winston, { format } from "winston";
import 'winston-daily-rotate-file'
import wtransports from "winston/lib/winston/transports";


const getLogger = (level = "info") => {
    const logDir = 'logs';

const transports : winston.transport[] = [];
let loggingLabel =  process.env.NODE_ENV;
console.log("Server Side : ");

const formatOptions = [
    format.prettyPrint({
        colorize: true
    }),
    format.timestamp({
        format: 'DD-MM-YYYY hh:mm:ss.SSS A'
    }),
    format.printf(({ level, message, label=loggingLabel, timestamp }) =>
        `${timestamp} [${label}] ${level}: ${message}`),
    format.splat()];

    transports.push(
        new wtransports.DailyRotateFile({
            filename: `${logDir}/%DATE%.log`,
            level: level,
            format: format.combine(...formatOptions),
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d',
            json: true,
        }),
        new wtransports.Console({
            consoleWarnLevels: ["error", "warn"],
            format: format.combine(...formatOptions),

        })
    );
    return winston.createLogger({
        level,
        transports
    });
}

export default getLogger;
