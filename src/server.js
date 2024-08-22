const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes');
const { NODE_PORT, sequelize, WHITELIST, SECRET_CORS_KEY, NODE_ENV } = require('./config/config');
const os = require('os')
const cluster = require('cluster')
const helmet = require('helmet')
const morgan = require('morgan')
const logger = require('./logger')
const rateLimiter = require('express-rate-limit');
const session = require('express-session')

const setupRateLimiter = () => rateLimiter({
    windowMs : 15 * 60 * 1000, //
    max : 100,
    message : 'Too many request please try again later..'
})

const setupCORS = () => {
    return cors({
        origin : function (origin , callback){
            if (WHITELIST.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }})
}

const setupSession = () => {
    session({
        secret : SECRET_CORS_KEY,
        resave : false,
        saveuUninitialize : true,
        cookie : {
            secure : NODE_ENV === 'production',
            httpOnly : true, 
            maxAge : 1000 * 60 * 60 * 72 //age session is 3 day
        }
    })
}
    
const setupErrorHandler = () => (err, req, res, next) => {
    logger.error(`Error message : ${err.message}`)
    res.status(500).json({
        'error' : {
            'message' : 'something going wrong'
        }
    })
}

const setupLogger = () => morgan('combined', {
        stream : {
            write : (message) => logger.info(message.trim())
        }
    })

if (cluster.isMaster) {
    let numCPUs = os.cpus().length
    for (let index = 0; index < numCPUs; index++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        if (signal) {
            console.log(`Worker ${worker.process.pid} was died, by signal ${signal}`)
        } else if(code !== 0){
            console.log(`Worker ${worker.process.pid} was died with code ${code}`)
        } else {
            console.log(`Worker ${worker.process.pid} was killed succesfully`)
        }
        console.log('Forking new worker...')
        cluster.fork()
    })
} else {      
    app.use(setupRateLimiter())
    
    app.use(setupCORS())
    
    app.use(bodyParser.json({limit : '10kb'}))
    app.use(bodyParser.urlencoded({extended : true}))

    app.use(setupSession())

    app.use(helmet())
    app.use(setupLogger())

    app.use(setupErrorHandler())

    app.use('/', routes)

    sequelize.authenticate()
        .then(() => {console.log('connected with database')})
        .catch(err => {console.error('Error while authenticate sequelize in server', err)})
    
    sequelize.sync({force : false})
        .then(() => {console.log('connected with DDL database model')})
        .catch(err => {console.error('Error while syncronization sequelize in server', err)})
    
        app.listen(NODE_PORT, () => {
        console.log(`server running on port = ${NODE_PORT} `)
    })
}