const express = require('express')
const bcrypt = require('bcrypt')
const { SALT_ROUND } = require('../config/config')
const router = express.Router()
const {verifyToken} = require('../middleware/jwtMiddleware')

router.get('/', (req, res) => {
    req.session.login = true,
    req.session.username = 'ferrypradana',
    res.send({id:req.decoded?req.decoded.id:'id', 'session' : req.session})
})

router.post('/:query1/:query2', (req, res) => {
    console.log('=====' + 'Params' +'=====')
    console.log(req.params.query1 + req.params.query2)
    console.log('=====' + 'Body' +'=====')
    console.log(req.body)
    console.log('=====' + 'Query' +'=====')
    console.log(req.query)
    res.set('authorization', 'token')
    res.status(200).json({
        'query' : req.query,
        'body' : req.body,
        'header' : req.headers
    })
    // $2b$10$eE1BHgWs9myimGa36UMbouF0gAnBH/pLPq9WRIS2BUfV.ZRF/Al22
    const hash = bcrypt.hashSync('password', 10)
    console.log(hash)
})

router.post('/', (req, res) => {
    console.log('=====' + 'SESSION' +'=====')
    console.log(req.session)
    console.log('=====' + 'SESSION 1' +'=====')
    console.log(req.sessionID)
    console.log('=====' + 'SESSION 2' +'=====')
    console.log(req.sessionStore)
    req.session.login = true
    console.log('=====' + 'Headers' +'=====')
    console.log(req.headers['content-type'])
    console.log('=====' + 'CT 1' +'=====')
    console.log('Query : ' + req.query)
    console.log('=====' + 'CT 2' +'=====')
    console.log('Body : ' + req.body)
    res.status(200).json({
        'header' : req.headers,
        'session' : req.session
    })
})

module.exports = router