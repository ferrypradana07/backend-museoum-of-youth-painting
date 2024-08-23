
const { getContacUsFormData, createContacUsFormData } = require('../service/contactusService')
const {numberValidator, convertToNumberType} = require('../utill/type')

exports.getContactUsForm = async(req, res) => {
    try {
        const {userId} = req.params??'';
        const {offset, limit} = req.query??'';
        if (!userId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'userId are required'
                }
            })
        }
        const order = 'ASC'
        const newOffset = await convertToNumberType(offset)
        const newLimit = await convertToNumberType(limit)
        const result = await getContacUsFormData(newOffset, order, newLimit)
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        res.status(200).json({
            'forms' : result
        })
    } catch (error) {
        console.error('Error while getting form in controller',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}

exports.createContactUsForm = async(req, res) => {
    try {
        const {username, email, subject, message} = req.body??''
        console.log(req)
        if (!username || !email || !subject || !message) {
            return res.status(400).json({
                'error' : {
                    'message' : 'username, email, subject, message are required'
                }
            })
        }
        const result = await createContacUsFormData(username, email, subject, message)
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        res.status(200).json({
            'message' : 'success'
        })
    } catch (error) {
        console.error('Error while creating form in controller',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}