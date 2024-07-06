const appName = 'my-app'
const env = process.env.NODE_ENV
const util = require('util')
const { createLogger, format, transports } = require('winston')
const { combine, timestammp } = format

const winstonLogger = createLogger({
    format: combine(
        timestammp(),
        format.json()
    ),
    transports: [new transports.Console()]
})

class Logger {
    constructor(corrId, method, apiName){
        this.correction_id = corrId;
        this.logger = winstonLogger;
        this.methodName = method;
        this.info = this.info.bind(this);
        this.error = this.error.bind(this);
        this.app = appName;
        this.env = env;
        this.apiName = apiName;
    }

    info(msg, statusCode, uri){
        let infoMessage  = {
            app: this.app,
            env: this.env,
            level: 'info',
            message: util.inspect(msg, true, null),
            uri: uri,
            statusCode: statusCode,
            correction_id: this.correction_id,
            method: this.methodName,
            apiName: this.apiName
        }
        infoMessage = JSON.parse(JSON.stringify(infoMessage))
        this.logger.log(infoMessage)
    }

    error(msg, statusCode, uri){
        let messageToLog  = {
            app: this.app,
            env: this.env,
            level: 'error',
            message: util.inspect(msg, true, null),
            uri: uri,
            statusCode: statusCode,
            correction_id: this.correction_id,
            method: this.methodName,
            apiName: this.apiName
        }
        messageToLog = JSON.parse(JSON.stringify(messageToLog))
        this.logger.log(messageToLog)
    } 
}

module.exports = Logger
