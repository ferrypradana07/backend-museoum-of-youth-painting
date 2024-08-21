const {contactus} = require('../model/contactusModel')

exports.createContacUsFormData = async (username, email, subject, message) =>{
    try {
        const result = await contactus.create({
            username : username,
            email : email,
            subject : subject,
            essage : message
        })
        if (result) {
            return {'success' : {
                'message':'success'
            }}
        }
        return {'failed' : {
            'message' : 'Failed create form data'
        }}
    } catch (error) {
        console.error('Error while create form data in service',error)
        return {'error' : {
                'message' : 'Something going wrong'
            }}
    }
}

exports.getContacUsFormData = async (offset, order, limit) =>{
    try {
        const result = await contactus.findAll({
            offset : offset,
            order : ['createAt', order],
            limit : limit 
        })
        if (result.length > 0) {
            return {'forms' : result}
        }
        return {'failed' : {
            'message' : 'Failed get form data'
        }}
    } catch (error) {
        console.error('Error while getting form data in service',error)
      return {'error' : {
                'message' : 'Something going wrong'
            }}
    }
}
