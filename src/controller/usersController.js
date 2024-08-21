const {getUsers} = require('../service/userService')
const {convertToNumberType} = require('../utill/type')
const {numberValidator} = require('../utill/type')

exports.getUsers = async (req, res) => {
    try {
        const {page, limit} = req.query??'';
        if (!page || !page) {
            return res.status(400).json({
                'error' : {
                    'message' : 'page and limit query are required'
                }
            })
        }
        const order = 'ASC'
        const validType = await numberValidator(page) && await numberValidator(limit)
        if (!validType) {
            return res.status(400).json({
                'error' : {
                    'message' : 'offset or limit query type are invalid'
                }
            })
        }
        const offset = page * 15
        const newOffset = await convertToNumberType(offset)
        const newLimit = await convertToNumberType(limit)
        const result = await getUsers(newOffset, order, newLimit)

        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        return res.status(200).json({...result})
    } catch (error) {
        console.log(error)
        res.status(500).json({'error' : {'message' : 'internal is error'}})
    }
}
