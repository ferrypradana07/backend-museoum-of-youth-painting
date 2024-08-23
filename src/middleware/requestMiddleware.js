const {numberValidator} = require('../utill/type')
const {validationUsername, validationEmail} = require('../service/userService')
const {createURL} = require('../utill/location')
const {passwordValidation} = require('../utill/password')

exports.imageValidation = async (req, res) => {
    try {
        const {title, description} = req.body??''
        if (!title || !description) {
            return res.status(400).json({
                'error' : {
                    'message' : 'title and description is require'
                }
            })
        }
        if (title.length > 100) {
            return res.status(400).json({
                'error' : {
                    'message' : 'title length is too long'
                }
            })
        }
        if (description.length > 500) {
            return res.status(400).json({
                'error' : {
                    'message' : 'description length is too long'
                }
            })
        }
        return next()
    } catch (error) {
        console.error('Error while validating upload image request validation middleware ', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going error'
            }
        })
    }
}




exports.gettingManyDatasValidation = async (req, res) => {
    try {
        const {offset, limit} = req.query??''
        if (!offset || !limit) {
            return res.status(400).json({
                'error' : {
                    'message' : 'offset and limit are require'
                }
            })
        }
        const validType = await numberValidator(offset) && await numberValidator(limit)
        if (!validType) {
            return res.status(400).json({
                'error' : {
                    'message' : 'offset or limit query type are invalid'
                }
            })
        }
        if (limit > 10) {
            return res.status(400).json({
                'error' : {
                    'message' : 'max limit is 10'
                }
            })
        }
        return next()
    } catch (error) {
        console.error('Error while validating upload image request validation middleware ', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going error'
            }
        })
    }
}