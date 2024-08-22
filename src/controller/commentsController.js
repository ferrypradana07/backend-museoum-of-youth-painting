const { getCommentsData } = require('../service/commentsService')
const {convertToNumberType, numberValidator} = require('../utill/type')

exports.getComments = async (req, res) => {
    try {
        const {offset, limit} = req.query??''
        const {imageId} = req.params??''
        if (!offset || !limit || !imageId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'offset, limit and imageId is require'
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