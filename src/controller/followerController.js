const { createFollowerData, deleteFollowerData } = require('../service/followerService')

exports.createfollower = async(req, res) => {
    try {
        const {userId} = req.params??'';
        const {id} = req.decoded??'';
        if (!userId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'userId is required'
                }
            })
        }
        const result = await createFollowerData(id, userId)
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
        console.error('Error while creating follower in controller',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}

exports.deletefollower = async(req, res) => {
    try {
        const {userId} = req.params??''
        const {id} = req.decoded??''
        if (!userId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'userId is required'
                }
            })
        }
        const result = await deleteFollowerData(id, userId)
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
        console.error('Error while deleting follower in controller',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}