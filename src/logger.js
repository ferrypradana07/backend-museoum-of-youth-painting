const {createLogger, format, transports} = require('winston')
const {combine, timestamp, printf} = format

const formatLogger = printf(({level, message, timestamp}) =>{
    return `${message}:${level.toUpperCase()}:${timestamp}`
})
const logger = createLogger({
    format : combine(
        timestamp(),
        formatLogger
    ),
    transports : [
        new transports.Console(),
        new transports.File({filename:'logs/app.log'})
    ] 
}) 

module.exports = logger