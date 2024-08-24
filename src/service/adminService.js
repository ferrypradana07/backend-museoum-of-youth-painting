const {admins} = require('../model/adminModel')

exports.login = async (username, password) => {
    try {
        const result = await admins.findOne({
            where : {
                username : username, 
            },
            attributes : ['id', 'username', 'password']
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
        console.error('Error while admin login in admin service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}