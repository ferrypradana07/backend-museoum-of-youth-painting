const { login } = require('../service/adminService')
const { signToken } = require('../utill/token')
const {createHistory} = require('../service/historyService')
const {deleteUserData} = require('../service/userService')
const {deleteImageData} = require('../service/imageService')
const {deleteCommentData} = require('../service/commentsService')

exports.authorization = async (req, res) => {
    try {
        const {username, password} = req.body??'';
        res.set('Content-Type', 'application/json')
        if (!username || !password) {
            return res.status(400).json({
                'error' : {
                    'message' : 'username and password are require'
                }
            })
        } 
        const admin = await login(username, password)
        
        if (admin.failed || admin.error) {
            return res.status(500).json({
                'error' : {
                    'message' : admin.error?admin.error.message:admin.failed.message
                }
            })
        }
        const obj = {
            'id' : admin.id,
            'username' : admin.username,
            'role' : 'admin'
        }
        const token = await signToken(obj, '24h')

        if (admin) {
            return res.status(201).json({
                'admin' : admin,
                'token' : token
            })
        }
        res.status(500).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    } catch (error) {
        console.error('Error while admin login in admin controller',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const {userId} = req.params??'';
        const {id, username} = req.decoded;
        res.set('Content-Type', 'application/json')
        if (!userId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'image id and userId is require'
                }
            })
        } 
        const message = await deleteUserData(id)
        
        if (message.failed || message.error) {
            return res.status(500).json({
                'error' : {
                    'message' : message.error?message.error.message:message.failed.message
                }
            })
        }
        res.status(201).json({
            'message' : message.success.message
        })
        await createHistory(id, `Admin ${username} had deleted user with userId is ${userId}`)
    } catch (error) {
        console.error('Error while deleting user in admin controller',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}

exports.deleteImage = async (req, res) => {
    try {
        const {imageId} = req.params??'';
        const {id, username} = req.decoded;
        res.set('Content-Type', 'application/json')
        if (!imageId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'image id is require'
                }
            })
        } 
        const message = await deleteImageData(imageId, id)
        
        if (message.failed || message.error) {
            return res.status(500).json({
                'error' : {
                    'message' : message.error?message.error.message:message.failed.message
                }
            })
        }
        res.status(201).json({
            'message' : 'image deleted'
        })
        await createHistory(id, `Admin ${username} had deleted image with imageId is ${imageId}`)
    } catch (error) {
        console.error('Error while deleting image in admin controller',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const {commentId} = req.params??'';
        const {id, username} = req.decoded;
        res.set('Content-Type', 'application/json')
        if (!commentId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'image id is require'
                }
            })
        } 
        const message = await deleteCommentData(commentId)
        
        if (message.failed || message.error) {
            return res.status(500).json({
                'error' : {
                    'message' : message.error?message.error.message:message.failed.message
                }
            })
        }
        res.status(201).json({
            'message' : 'comment deleted'
        })
        await createHistory(id, `Admin ${username} had deleted comment with commentId is ${imageId}`)
    } catch (error) {
        console.error('Error while deleting comment in admin controller',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}