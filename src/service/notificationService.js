const {notification} = require('../model/notificationModel')

exports.createNotificationData = async (userId, title, message) =>{
    try {
        const result = await notification.create({
            userId : userId,
            title : title,
            message : message
        })
        if (result) {
            return {'success' : 'success'}
        }
        return  {'failed' : {
            'message' : 'Failed bulk create notification'
        }}
    } catch (error) {
        console.error('Error while create collection data in service',error)
        return {'error' : 'somthing going wrong'}
    }
}

exports.createNotificationBulkData = async (arrayInput) =>{
    try {
        const result = await notification.bulkCreate({
            arrayInput
        })
        if (result) {
            return {'success' : 'success'}
        }
        return  {'failed' : {
            'message' : 'Failed create notification'
        }}
    } catch (error) {
        console.error('Error while create notification bulk data in service',error)
        return {'error' : 'something going wrong'}
    }
}

exports.getNotificationsData = async (userId, limit) =>{
    try {
        const result = await notification.findAll({
            where : {
                userId : userId
            },
            attributes : ['title', 'message'],
            order : ['createAt', 'DESC'],
            limit : limit
        })
        if (result) {
            return {'notifications' : result}
        }
        return  {'failed' : {
            'message' : 'Not found'
        }}
    } catch (error) {
        console.error('Error while getting notification data in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}
