const jwt = require('jsonwebtoken');
const { SECRET, WEB_DOMAIN } = require('../config/config');
const {createURL} = require('../utill/location')


exports.signToken = async (id, role, username) => {
    try {
        if (!id || !role || !username) {
           return 'invalid'
        }
        const user = {id, role, username}
        const token = jwt.sign(user, SECRET, {expiresIn : '240h'})
        return token
    } catch (error) {
        console.error('Error while creating token in middleware', error)
        return 'error'
    }
}

exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']??'';
    if (!authHeader) {
        return res.status(300).json({
            'message' : 'Header Authorization is required'
        })
    }
    const token = authHeader.split(' ')[1];
    console.log(token)
    try {
        jwt.verify(token, SECRET, (err, decoded) => {
            console.log(decoded)
            console.log('=========dec0de')
            if (err) {
                console.log(err)
                return
            }
            if (!decoded.id || !decoded.role || !decoded.username) {
                console.log(err)
                return
            }
            return req.decoded = decoded 
        })
    } catch (error) {
        return res.status(400).json({
            'error' : {
                'message' : 'token is invalid'
            }
        })
    }
    if (!req.decoded) {
        return res.status(400).json({
            'error' : {
                'message' : 'token is invalid'
            }
        })
    }
    return next()
}

exports.verifyTokenAdmin = async (req, res, next) => {
    const authHeader = req.headers['authorization']??'';
    if (!authHeader) {
        return res.status(300).json({
            'message' : 'Header Authorization is required'
        })
    }
    const token = authHeader.split(' ')[1];
    console.log(token)
    try {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                return
            }
            if (!decoded.id || !decoded.role || !decoded.username || decoded !== 'admin') {
                console.log(err)
                return
            }
            return req.decoded = decoded 
        })
    } catch (error) {
        return res.status(400).json({
            'error' : {
                'message' : 'token is invalid'
            }
        })
    }
    if (!req.decoded) {
        return res.status(400).json({
            'error' : {
                'message' : 'token is invalid'
            }
        })
    }
    return next()
}

exports.optionalVerifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']??'';
    if (!authHeader) {
        return next()
    }
    const token = authHeader.split(' ')[1];
    console.log(token)
    try {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                return
            }
            if (!decoded.id || !decoded.role || !decoded.username) {
                console.log(err)
                return
            }
            return req.decoded = decoded 
        })
    } catch (error) {
        return res.status(400).json({
            'error' : {
                'message' : 'token is invalid'
            }
        })
    }
    if (!req.decoded) {
        return res.status(400).json({
            'error' : {
                'message' : 'token is invalid'
            }
        })
    }
    return next()
}

exports.signTokenUpdatePass = async (req, res, next) => {
    try {
        const {email} = req.body??''
        if (!email) {
            return res.status(400).json({
                'error' : {
                    'message' : 'email is required'
                }
            }) 
        }
        const token = jwt.sign(email, SECRET, {expiresIn : '15m'})
        const URL = await createURL(`changepassword?token=${token}`)
        req.mailObject = {
            'to' : email,
            'subject': `${WEB_DOMAIN} password reset`,
            'text' : `link change password ${URL} <br> note : token is valid for 15 minutes`
        }
        return next() 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })        
    }
}

exports.verifyTokenForUpdatePassword = async (req, res, next) => {
    const authHeader = req.headers['authorization']??'';
    if (!authHeader) {
        return res.status(300).json({
            'message' : 'Header Authorization is required'
        })
    }
    const token = authHeader.split(' ')[1];
    console.log(token)
    try {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err || !decoded.userMail) {
               return
            }
            return req.decoded = decoded 
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            'error' : {
                'message' : 'token is invalid'
            }
        })
    }
    if (!req.decoded) {
        return res.status(400).json({
            'error' : {
                'message' : 'token is invalid'
            }
        })
    }
    return next()
}