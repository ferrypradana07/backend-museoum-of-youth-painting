const {getUsersData} = require('../service/userService')
const {convertToNumberType} = require('../utill/type')

exports.getUsers = async (req, res) => {
    try {
        const {offset, limit} = req.query??'';
        const order = 'ASC'
        const newOffset = await convertToNumberType(offset)
        const newLimit = await convertToNumberType(limit)
        const result = await getUsersData(newOffset, order, newLimit)
        res.set('Content-Type', 'application/json')
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        return res.status(200).json({result})
    } catch (error) {
        console.error('Error while getting users data', error)
        res.status(500).json({'error' : {'message' : 'internal is error'}})
    }
}
