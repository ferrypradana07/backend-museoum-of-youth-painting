const jwt = require('jsonwebtoken')

exports.signToken = async (property1, property2, property3, expired) => {
    try {
        if (!property1 || !property2 || !property3 || !expired) {
           return 'invalid'
        }
        const obj = {property1, property2, property3}
        const token = jwt.sign(obj, SECRET, {expiresIn : expired})
        return token
    } catch (error) {
        console.error('Error while creating token in middleware', error)
        return 'error'
    }
}
