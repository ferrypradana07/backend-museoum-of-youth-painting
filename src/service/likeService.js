const {likes} = require('../model/likeModel')

exports.createLikeData = async (userId, postId, imageId) =>{
    try {
        const result = await likes.create({
            userId : userId,
            postId : postId,
            imageId : imageId
        })
        if (result) {
            return {'success': {
                'message' : "success"
            }}
        }
        return  {'failed' : {
            'message' : 'Failed create user like'
        }}
    } catch (error) {
        console.error('Error while create like data in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.deleteLikeData = async (userId, imageId) =>{
    try {
        const result = await likes.destroy({
            userId : userId,
            imageId : imageId
        })
        if (result) {
            return {'success': {'message' : "success"}}
        }
        return  {'failed' : {
            'message' : 'Failed delete user like'
        }}
    } catch (error) {
        console.error('Error while create like data in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}