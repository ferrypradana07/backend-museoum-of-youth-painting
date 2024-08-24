const {createCommentData} = require('../service/commentsService')

exports.createComment = async (req, res) => {
    try {
        const {text} = req.body??''
        const {imageId} = req.params??''
        const {id} = req.decoded.id
        res.set('Content-Type', 'application/json')
        if (!imageId || !text) {
            return res.status(400).json({
                'error' : {
                    'message' : 'text and imageId are require'
                }
            })
        } 
        const result = await createCommentData(imageId, id, text)
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        res.status(200).json({
            'comment' : {
                'commentId' : result.commentId
            },
            'message' : 'success create comment'
            
        })
    } catch (error) {
        console.error('Error while creating comment in controller ',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const {imageId} = req.params??''
        const {id} = req.decoded.id
        res.set('Content-Type', 'application/json')
        if (!imageId || !text) {
            return res.status(400).json({
                'error' : {
                    'message' : 'text and imageId are require'
                }
            })
        } 
        const result = await createCommentData(imageId, id, text)
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        res.status(200).json({
            'message' : 'success create comment'
        })
    } catch (error) {
        console.error('Error while creating comment in controller ',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}