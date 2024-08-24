const jwt = require('jsonwebtoken');
const { SECRET, WEB_DOMAIN } = require('../config/config');

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
            if (err) {
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
    return res.status(200).json({
        'success' : {
            'message' : 'token is valid'
        }
    })
}

exports.verifyUserToken = async (req, res, next) => {
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
            if (err) {
                console.log(err)
                return
            }
            if (!decoded.id || !decoded.role || !decoded.username || decoded.role != 'user') {
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

exports.verifyAdminToken = async (req, res, next) => {
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
            if (!decoded.id || !decoded.role || !decoded.username || decoded.role != 'admin') {
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

exports.verifyRegisterToken = async (req, res, next) => {
    const {token} = req.query??'';
    if (!token) {
        return res.status(300).json({
            'message' : 'token query is required'
        })
    }
    try {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                return
            }
            if (!decoded.username || !decoded.email || !decoded.password) {
                console.log(decoded)
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
        req.responOption = {
            'error' : {
                'message':'something going wrong'
            },
            'success' : {
                'message':'verification token email has been sended'
            }
        }
        const token = jwt.sign(email, SECRET, {expiresIn : '15m'})
        const URL = await createURL(`auth/change-password?token=${token}`)
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
