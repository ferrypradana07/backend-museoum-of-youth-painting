const {historys} = require('../model/historyModel')

exports.createHistory = async (adminId, activity) => {
    try {
        const result = await historys.create({
            adminId : adminId,
            activity : activity
        })
        return 
    } catch (error) {
        console.error('Error while delete like data in like service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}