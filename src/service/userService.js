const { Op, where } = require('sequelize')
const {users} = require('../model/userModel')
const bcrypt = require('bcrypt')

exports.login = async (email, password) => {
    try {
        const result = await users.findOne({
            where : {
                email : email, 
            },
            attributes : ['id', 'username', 'photo_profile', 'password']
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
        console.error('Error while user login in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.signup = async (username, email, password) => {
    try {
        const hashpassword = await bcrypt.hash(password, 10)
        const result = await users.create({
            username : username,
            email : email,
            password : hashpassword,
        }) 
        if (result) {
            return result
        }
        return {'failed' : {
            'message' : 'failed create account'
        }}
    } catch (error) {
        console.error('Error while signup in service',error)
        return {'error' : {
            'message' : 'something going error'
        }}
    }
}

exports.deleteUser = async (userId) => {
    try {
        const result = await users.destroy({
           where : {
            id : userId
           }
        }) 
        if (result) {
            return {'success' : 'success'}
        }
        return {'failed' : {
            'message' : 'Failed delete user account'
        }}
    } catch (error) {
        console.error('Error while deleting user in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.updatePassword = async (email, password) => {
    try {
        const result = await users.findOne({
            email : email
        }) 
        if (!result) {
            return {}
        }
        const validation = bcrypt.compare(result.password, password)
        if (validation) {
            return {'failed' : 'password is match'}
        }
        const newPassword = await bcrypt.hash(password, 10)
        result.password = newPassword
        await result.update({password:newPassword})
        await result.save()
        return {'success' : 'success'}
    } catch (error) {
        console.error('Error while updatePassword in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.updateUserData = async (id, username, description, country) => {
    try {
        const user = await users.findOne({
            id : id,
        }) 
        if (!user) {
            return {'failed' : {
                'message' : 'User not found'
            }}
        };
        username && user.username? user.update({username : username}) : '';
        description && user.description? user.update({description : description}) : '';
        country && user.country? user.update({country : country}) : '';
        user.save()
        return user
    } catch (error) {
        console.error('Error while update user data in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.getUsers = async (offset, order, limit) => {
    try {
        const usersData = await users.findAll({
            attributes : ['username', 'photo_profile'],
            offset : offset,
            order: [['createdAt', order]],
            limit:limit,
        }) 
        if (!usersData || usersData.length == 0) {
            return {}
        };
        
        return usersData
    } catch (error) {
        console.error('Error while getting user data in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.userValidation = async (username, email, password) => {
    try {
        const result = await users.findOne({
            where : {
                email : email, 
            },
            attributes : ['id', 'username', 'photo_profile', 'password']
        }) 
        if (!result) {
            return {}
        }
        const passValidation = result.password === password ? true : false ;
        const usernameValidation = result.username === username ? true : false ;
        if (passValidation && usernameValidation) {
            return result
        }
        return {}
    } catch (error) {
        console.error('Error while validation user in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.getUsernameByUserId = async(userId) => {
    try {
        const username = await users.findOne({
                where : {
                    id : userId
                },
                attributes : ['username']
            }
        ) 
        return username?username:{'failed' : 'not found'}
    } catch (error) {
        console.error('Error while getting username in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}


exports.validationUsername = async(username) => {
    try {
        const valid = await users.findOne({
                where : {
                    username : username 
                },
                attributes : ['username']
            }
        ) 
        return valid? false : true
    } catch (error) {
        console.error('Error while validating username ',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.validationEmail = async(email) => {
    try {
        const valid = await users.findOne({
                where : {
                    email : email 
                },
                attributes : ['email']
            }
        ) 
        return valid? false : true
    } catch (error) {
        console.error('Error while validating email in service ',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}