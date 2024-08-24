const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/config')

exports.signToken = async (obj, expired) => {
    try {
        if (!obj || !expired) {
           return 'invalid'
        }
        const token = jwt.sign(obj, SECRET, {expiresIn : expired})
        return token
    } catch (error) {
        console.error('Error while creating token in utill', error)
        return 'error'
    }
}
