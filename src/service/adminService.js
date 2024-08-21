const {admins} = require('../model/adminModel')

exports.login = async (email, password) => {
    try {
        const result = await admins.findOne({
            where : {
                email : email, 
            },
            attributes : ['id', 'password']
        }) 
        if (!result) {
            return {'failed' : {
                'message' : 'Not Found'
            }}
        }
        const validation = bcrypt.compare(result.password, password)
        if (validation) {
            return result
        }
        return {'failed' : {
            'message' : 'password is not match'
        }}
    } catch (error) {
        console.error('Error while admin login in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}