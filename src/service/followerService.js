const {followers} = require('../model/followerModel')

exports.createFollowerData = async (userId, postId) =>{
    try {
        const result = await followers.create({
            userId : userId,
            postId : postId
        })
        if (result) {
            return {'success' : {
                'message':'success'
            }}
        }
        return {'failed' : {
            'message' : 'Failed create follower data'
        }}
    } catch (error) {
        console.error('Error while create follower data in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.deleteFollowerData = async (userId, postId) =>{
    try {
        const result = await collections.delete({
            where : {
                userId : userId,
                postId : postId
            }
        })
        if (result) {
            return {'success' : {
                'message' : 'success'
            }}
        }
        return {'failed' : {
            'message' : 'Failed delete image data'
        }}
    } catch (error) {
        console.error('Error while deleteing follower data in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.getFollowersIdData = async (postId) =>{
    try {
        const result = await followers.findAll({
            where : {
                postId : postId
            }
        })
        if (result.length > 0) {
            return {'followers' : result}
        }
        return []
    } catch (error) {
        console.error('Error while getting followers data in service',error)
      return {'error' : {
                'message' : 'Something going wrong'
            }}
    }
}
