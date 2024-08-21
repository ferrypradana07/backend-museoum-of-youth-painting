const { getProfileData } = require('../service/profileService')

exports.getProfile = async(req, res) => {
    try {
        const {userId} = req.params??''
        res.set('Content-Type', 'application/json')
        if (!userId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'userId is require'
                }
            })
        }
        const {id} = req.decoded??''
        const result = await getProfileData(userId, id)
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        res.status(200).json({ 
            ...result
        })
    } catch (error) {
        console.error('Error while getprofile in controller', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}