const {comments} = require('../model/commentModel')
const {users} = require('../model/userModel')

exports.createCommentData = async (imageId, userId, comment) => {
    try {
        const result = await comments.create({
            imageId : imageId,
            userId : userId,
            text : comment
        }) 
        if (result) {
            return {
                'commentId' : result.id,
                'success' : {
                    'message' : 'success'
                }
            }
        } else {
            return {
                'failed' : {
                    'message' : 'failed create comment'
                }
            }
        }
    } catch (error) {
        console.error('Error while create comment in comment service', error)
        return { 
            'error' : {
                'message' : 'something going error'
            }
        }
    }
}

exports.deleteCommentData = async (commentId, imageId, userId) => {
    try {
        const result = await comments.destroy({
            where : {
                id : commentId,
            }
        }) 
        if (result > 0) {
            return {
                'success' : {
                    'message' : 'success'
                }
            }
        } else {
            return {
                'failed' : {
                    'message' : 'failed delete comment'
                }
            }
        }
    } catch (error) {
        console.error('Error while delete comment in comment service', error)
        return { 
            'error' : {
                'message' : 'something going error'
            }
        }
    }
}

exports.getCommentsData = async (imageId, offset, order, limit) => {
    try {
        const comment = await comments.findAll({
            id : imageId,
            offset : offset,
            order : [['createdAt', order]],
            limit : limit,
            attributes : ['userId', 'text']
        }) 
        
        if (comment.length > 0) {
            const result = await Promise.all(comment.map(async(index) => {
                const user = await users.findOne({
                    where : {
                        id : index.userId
                    },
                    attributes : ['id','username', 'photo_profile']
                })
                return user?{
                        userId : user.id,
                        username : user.username,
                        photo_profile : user.photo_profile,
                        text : index.text
                    }:'';
                
            }))
            if (result.length <= limit) {
                return {
                    'comments' : result,
                    'islast' : false
                }
            } else {
                result.pop()
                return {
                    'comments' : result,
                    'islast' : true
                }
            }
        } else {
            return {
                'failed' : {
                    'message' : 'comment not found'
                }
            }
        }
    } catch (error) {
        console.error('Error while delete comment in comment service', error)
        return { 
            'error' : {
                'message' : 'something going error'
            }
        }
    }
}


exports.getUsernameAndIdByUserId = async(arrayId) => {
    try {
        const result = await Promise.all(arrayId.map(async(index) => {
            const user = await users.findOne({
                where : {
                    id : index
                }
            })
            return {
                userId : index,
                username : user.username,
                photo_profile : user.photo_profile
            }
        }))
        const username = await users.findOne({
                where : {
                    id : {
                        [Op.in] : arrayId
                    }
                },
                attributes : ['username']
            }
        ) 
        return username?username:{'failed' : 'not found'}
    } catch (error) {
        console.error('Error while getting username in comment service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}
