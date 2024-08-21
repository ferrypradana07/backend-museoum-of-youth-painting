const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes');
const { NODE_PORT, sequelize, WHITELIST, SECRET_CORS_KEY, NODE_ENV } = require('./config/config');
const { FORCE } = require('sequelize/lib/index-hints');
const cluster = require('cluster')
const os = require('os')
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimiter = require('express-rate-limit');
const session = require('express-session')
const logger = require('./logger')

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
    const limiter = rateLimiter({
        windowMs : 15 * 60 * 1000, //
        max : 100,
        message : 'Too many request please try again later..'
    })
    app.use(limiter)
    
    const corsOption = {
        origin : function (origin , callback){
            if (WHITELIST.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }
    app.use(cors(corsOption))
    
    app.use(bodyParser.json({limit : '10kb'}))
    app.use(bodyParser.urlencoded({extended : true}))

    app.use(session({
        secret : SECRET_CORS_KEY,
        resave : false,
        saveuUninitialize : true,
        cookie : {
            secure : NODE_ENV === 'production',
            httpOnly : true,
            maxAge : 1000 * 60 * 60 *24
        }
    }))

    app.use(helmet())
    app.use(morgan('combined', {
        stream : {
            write : (message) => logger.info(message.trim())
        }
    }))

    app.use((err, req, res, next) => {
        logger.error(`Error message : ${err.message}`)
        res.status(500).json({
            'error' : {
                'message' : 'something going error'
            }
        })
    })

    app.use('/', routes)

    sequelize.authenticate()
        .then(() => {console.log('connected with database')})
        .catch(err => {console.error('Error while authenticate sequelize in server', err)})
    
    sequelize.sync({force : false})
        .then(() => {console.log('connected with DDL database model')})
        .catch(err => {console.error('Error while syncronization sequelize in server', err)})
    
        app.listen(NODE_PORT , () => {
        console.log(`server running on port = ${NODE_PORT} `)
    })
}