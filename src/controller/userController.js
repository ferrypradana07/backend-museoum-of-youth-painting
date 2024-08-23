const {login, signup, updateUserData, updatePassword, validationUsername, validationEmail} = require('../service/userService')
const {passwordValidation} = require('../utill/password')
const {getCountryById} = require('../service/countryService')
const { numberValidator } = require('../utill/type')
const {validEmail} = require('../utill/email')
const {createNotificationData} = require('../service/notificationService')
const {createURL} = require('../utill/location')
const {signToken} = require('../utill/token')

exports.authorization = async (req, res) => {
    try {
        const {email, password} = req.body??'';
        res.set('Content-Type', 'application/json')
        if (!email || !password) {
            return res.status(400).json({
                'error' : {
                    'message' : 'email or password are required'
                }
            })
        }
        const result = await login(email, password)
        if(req.session.login == true){

        }
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        const token = await signToken(result.id, 'user', result.username)
        return res.status(200).json({
            'token': token ,
            'message' : 'success'
        })
    } catch (error) {
        console.error('Error while authorization user in userController',error)
        return res.status(500).json({
            'error' : {
                'message':'something going wrong'
            }
        })
    }
}

exports.emailValidation = async (req, res, next) => {
    try {
        const {username, email, password} = req.body??'';
        res.set('Content-Type', 'application/json')
        if (!username || !email || !password) {
            return res.status(400).json({
                'error' : {
                    'message' : 'username, email and password are required'
                }
            })
        }
        const passValidation = await passwordValidation(password)
        const valid = Object.values(passValidation).every(value => value === true)
        if (!valid){
            return res.status(404).json({
                'error' : {
                    'message' : 'password is invalid',
                    'validator': passValidation
                }
            })
        }
        const isAvailableUsername = await validationUsername(username)
        if (!isAvailableUsername) {
            return res.status(400).json({
                'error' : {
                    'message' : `username is unavailable`
                }
            })
        }
        const isValidEmail = await validEmail(email)
        if (!isValidEmail) {
            return res.status(400).json({
                'error' : {
                    'message' : `email is invalid`
                }
            })
            
        }
        const isAvailableEmail = await validationEmail(email)
        if (!isAvailableEmail) {
            return res.status(400).json({
                'error' : {
                    'message' : `email is unanvailable`
                }
            })
            
        }
        const JWT = await signToken(username, email, password, '15m')
        const verifyURL = createURL(`api/verify-email/?token=${JWT}`);
        
        req.mailObject = {
            to : email,
            subject : 'email verification',
            text :  `Link : ${verifyURL} Note token expired in 15m and dont share this link to anyone`
        }        
        req.responOption = {
            'error' : {
                'message':'something going wrong'
            },
            'success' : {
                'message':'verification email has been sended'
            }
        }
        return next()
    } catch (error) {
        console.error('Error while validating email for registering request middleware ', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going error'
            }
        })
    }
}

exports.register = async (req, res) => {
    try { 
        const {username, email, password} = req.decoded??'';
        res.set('Content-Type', 'application/json')
        if (!username || !email || !password) {
            return res.status(400).json({
                'error' : {
                    'message' : 'username, email and password are required'
                }
            })
        }
        const user = await signup(username, email, password)
        if (user.failed || !user.error) {
            return res.status(500).json({
                'error' : {
                    'message' : 'something going error'
                }
            })
        }
        const token = await signToken(user.id, user.username, 'user', '72h')
        res.status(200).json({
            'token' : token,
            'user' : {
                'id' : user.id,
                'username' : user.username
            },
            'message' : 'user registerd succesfully'
        })
        await createNotificationData(user.id, 'welcome to museoum web', 'welcome to museoum web')
    } catch (error) {
        console.error('Error while registering user in userController',error)
        return res.status(500).json({
            'error' : {
                'message':'something going wrong'
            }
        })
    }
}

exports.updateUserData = async (req, res) => { 
    try {
        const {newUsername, description, countryId} = req.body??'';
        const {id} = req.decoded
        const isNumberType = countryId? await numberValidator(countryId):false
        if (isNumberType) {
            return res.status(400).json({
                'error' : {
                    'message' : `countryId type is invalid`
                }
            })
        }
        const isValidId = countryId? await getCountryById(countryId):false
        if (isValidId) {
            return res.status(400).json({
                'error' : {
                    'message' : `countryId is invalid`
                }
            })
        }
        const isValidUsername = newUsername? await validationUsername(newUsername):false
        if (isValidUsername) {
            return res.status(400).json({
                'error' : {
                    'message' : `username is unavailable`
                }
            })
        }
        const updatedUser = await updateUserData(id, newUsername, description, countryId)
        res.set('Content-Type', 'application/json')
        if (updatedUser.failed || updatedUser.error) {
            return res.status(404).json({
                'error' : {
                    'message' : 'something going wrong'
                }
            })
        }
        res.status(200).json({
            'message' : 'success update user',
            'user' : {
                    'username':newUsername,
                }
        })
    } catch (error) {
        console.error('Error while updating user in userController',error)
        return res.status(500).json({
            'error' : {
                'message':'something going wrong'
            }
        })
    }
}

exports.updateUserPassword = async (req, res) => { 
    try {
        const {newPassword} = req.body??'';
        const email = req.decoded
        const passValidation = await passwordValidation(password)
        const valid = Object.values(passValidation).every(value => value === true)
        res.set('Content-Type', 'application/json')
        if (!valid){
            return res.status(404).json({
                'error' : {
                    'message' : 'password is invalid',
                    'validator': passValidation
                }
            })
        }
        const updatedUser = await updatePassword(email, newPassword)
        if (!updatedUser || updatedUser.error || updatedUser.failed) {
            return res.status(404).json({
                'error' : {
                    'message' : 'Not Found'
                }
            })
        }
        return res.status(200).json({
            'message' : 'password updated successfully'
        })
    } catch (error) {
        console.error('Error while updating user password',error)
        return res.status(500).json({
            'error' : {
                'message':'something going wrong'
            }
        })
    }
}