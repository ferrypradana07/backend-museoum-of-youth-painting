const {login, signup, updateUserData, updatePassword, validationUsername} = require('../service/userService')
const {signToken} = require('../middleware/jwtMiddleware')
const {passwordValidation} = require('../utill/password')
const {getCountryById} = require('../service/countryService')
const { numberValidator } = require('../utill/type')
const {emailValidation} = require('../utill/email')

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

        if (!result || result.error) {
            return res.status(404).json({
                'error' : {
                    'message' : 'email or password is invalid'
                }
            })
        }
        const token = await signToken(result.id, 'user', result.username)
        return res.status(200).json({'token': token ,'message' : 'success'})
    } catch (error) {
        console.error('Error while authorization user in userController',error)
        return res.status(500).json({
            'error' : {
                'message':'something going wrong'
            }
        })
    }
}

exports.register = async (req, res) => {
    try { 
        const {username, email, password} = req.body??'';
        res.set('Content-Type', 'application/json')
        if (!username || !email || !password) {
            return res.status(400).json({
                'error' : {
                    'message' : 'username or email or password are required'
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
        const isValidUsername = await validationUsername(username)
        if (!isValidUsername) {
            return res.status(400).json({
                'error' : {
                    'message' : `username is unavailable`
                }
            })
            
        }
        const isValidEmail = await emailValidation(email)
        if (!isValidEmail) {
            return res.status(400).json({
                'error' : {
                    'message' : `email is invalid`
                }
            })
            
        }
        const result = await signup(username, email, password)

        if (!result || result.error) {
            return res.status(404).json({
                'error' : {
                    'message' : 'username or email or password is invalid'
                }
            })
        }
        const {id} = result
        const token = await signToken(id, 'user', username)
        return res.status(201).json(
            {   
                'message' : 'user registered succesfully',
                'token' : token, 
                'user' : {
                    'id' : result.id,
                    'username' : result.username
                }
            }
        )
    } catch (error) {
        console.error('Error while registering user in userController',error)
        return res.status(500).json({
            'error' : {
                'message':'something going wrong'
            }
        })
    }
}

// exports.getUserData = async (req, res, next) => {
//     try {
//         const {userId} = req.params??'';
//         if (!userId) {
//             return res.status(400).json({
//                 'error' : {
//                     'message' : 'userId is required'
//                 }
//             })
//         }
//         const result = await users.findOne({
//             where : {
//                 id : userId,
//                 status : 'active'
//             },
//             attributes : ['username', 'photo_profile', 'description', 'country']
//         })
//         if (!result) {
//             return res.status(404).json({
//                 'message' : 'Not Found',
//                 'user' : {}
//             })
//         }
//         req.user = result
//         // res.status(200).json({'user' : result})
//         return next()
//     } catch (error) {
//         console.error('Error while getting users in userController',error)
//         return res.status(500).json({
//             'error' : {
//                 'message':'something going wrong'
//             }
//         })
//     }
// }

exports.updateUserData = async (req, res) => { 
    try {
        const {newUsername, description, countryId} = req.body??'';
        const {id} = req.decoded
        const isNumberType = await numberValidator(country)
        if (isNumberType) {
            return res.status(400).json({
                'error' : {
                    'message' : `countryId type is invalid`
                }
            })
        }
        const isValidId = await getCountryById(countryId)
        if (isValidId) {
            return res.status(400).json({
                'error' : {
                    'message' : `countryId is invalid`
                }
            })
        }
        const isValidUsername = await validationUsername(newUsername)
        if (isValidUsername) {
            return res.status(400).json({
                'error' : {
                    'message' : `username is unavailable`
                }
            })
            
        }
        const updatedUser = await updateUserData(id, newUsername, description, countryId)
        res.set('Content-Type', 'application/json')
        if (!updatedUser || updatedUser.error) {
            return res.status(404).json({
                'message' : 'Not Found',
                'user' : {}
            })
        }
        res.status(200).json({
            'message' : 'success update user'
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