const { getCommentsData } = require('../service/commentsService')
const {convertToNumberType} = require('../utill/type')

exports.getComments = async (req, res) => {
    try {
        const {imageId} = req.params??''
        const {offset, limit} = req.query??''
        if (!imageId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'imageId is required'
                }
            })
        }  
        const newOffset = await convertToNumberType(offset)
        const newLimit = await convertToNumberType(limit)
        const order = 'ASC'
        const comments = await getCommentsData(imageId, newOffset, order, newLimit)
        if (comments.failed || comments.error) {
            return res.status(400).json({
                'error' : {
                    'message' : comments.failed?comments.failed.message:comments.error.message
                } 
            })
        }
        res.status(200).json({
            ...comments
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