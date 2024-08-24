 
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
        console.error('Error while user login in user service',error)
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
        console.error('Error while signup in user service',error)
        return {'error' : {
            'message' : 'something going error'
        }}
    }
}

exports.deleteUserData = async (userId) => {
    try {
        const result = await users.destroy({
           where : {
            id : userId
           } 
        }) 
        if (result) {
            return {'success' : {
                'message' : 'user deleted succesfully'
            }}
        }
        return {'failed' : {
            'message' : 'Failed delete user account'
        }}
    } catch (error) {
        console.error('Error while deleting userdata in user service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.updatePassword = async (email, password) => {
    try {
        const result = await users.findOne({
            where : {
                email : email
            }
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
        console.error('Error while updatePassword in user service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.updateUserData = async (id, username, URL, description, country) => {
    try {
        const user = await users.findOne({
            where : {
                id : id,
            }
        }) 
        if (!user) {
            return {'failed' : {
                'message' : 'User not found'
            }}
        };
        console.log('id, username,URL, description, country')
        console.log(id, username,URL, description, country)
        username ? user.update({username : username}) : '';
        URL ? user.update({URL : URL}) : '';
        description ? user.update({description : description}) : '';
        country ? user.update({country : country}) : '';
        user.save()
        return user
    } catch (error) {
        console.error('Error while update user data in user service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.getUsersData = async (offset, order, limit) => {
    try {
        const usersData = await users.findAll({
            attributes : ['id', 'username', 'photo_profile'],
            offset : offset,
            order: [['createdAt', order]],
            limit:limit+1,
        }) 
        if (usersData.length > 0) {
            if (usersData.length <= limit) {
                return {
                    'users' : usersData,
                    'isLast' : false
                }
            } else {
                return {
                    'users' : usersData,
                    'isLast' : true
                }
            } 
        }
        return {
            'failed' : {
                'message' : 'users not found'
            }
        }
    } catch (error) {
        console.error('Error while getting user data in user service',error)
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
        console.error('Error while validation user in user service',error)
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
        console.error('Error while getting username in user service',error)
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
        return false
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
        console.error('Error while validating email in user service ',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}