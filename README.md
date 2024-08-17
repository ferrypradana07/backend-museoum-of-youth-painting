
API ENDPOINT

============= USER =============

1. Register User

Method : 'POST'
URL : api/register

Header
```
{
    'Content-Type' : 'application/json'
}
```

Request Body

```
{
    'username' : <username>,
    'email' : <email>,
    'password' : <password>
}
```

Response 
```
{
    'message' : 'user registerd succesfully',
    'token' : <token>,
    'user' : {
        'id' : <id>,
        'username' : <username>,
        'email' : <email>
    }
}
```

2. Login User

Method : 'POST'
URL : api/login

Header
```
{
    'Content-Type' : 'application/json'
}
```

Request Body

```
{
    'username' : <username>,
    'email' : <email>,
    'password' : <password>
}
```

Response 
```
{
    'message' : 'Login succesfully',
    'token' : <token>,
    'user' : {
        'id' : <id>,
        'username' : <username>,
        'email' : <email>
    }
}
```

3. Get User

Method : 'GET'
URL : api/user?userId=<userId>

Header
```
{
    'Content-Type' : 'application/json'
}
```

Response 
```
{
    'page' : <page>
    'users' : {
        'id' : <id>,
        'username' : <username>,
        'photo_profile' : https://cdn.site/src/763ydahwhdamjhhHgsj
    },
    {
        'id' : <id>,
        'username' : <username>,
        'photo_profile' : https://cdn.site/src/763ydahwhdamjhhHheth
    }
}
```

4. Get Users

Method : 'GET'
URL : api/users

Header
```
{
    'Content-Type' : 'application/json'
}
```

Response 
```
{
    'page' : <page>
    'users' : {
        'id' : <id>,
        'username' : <username>,
        'photo_profile' : https://cdn.site/src/763ydahwhdamjhhHgsj
    },
    {
        'id' : <id>,
        'username' : <username>,
        'photo_profile' : https://cdn.site/src/763ydahwhdamjhhHheth
    }
}
```

5. UPDATE User Data

Method : 'PUT'
URL : api/user
Description : Update User data except password

Header
```
{
    'Content-Type' : 'application/json'
}
```

Request Body

```
{
    'username' : <new_username>,
    'description' : <new_description>,
}
```

Response 
```
{
    'message' : 'user updated succesfully'
}
```

7. UPDATE Password

Method : 'PUT'
URL : api/user
Description : Update password with use JsonWebToken

Header
```
{
    'Authorization' : Bearer <JsonWebToken>,
    'Content-Type' : 'application/json'
}
```

Request Body

```
{
    'password' : <new_password>
}
```

Response 
```
{
    'message' : 'user password updated succesfully'
}
```

8. UPDATE Photo Profile

Method : 'PUT'
URL : api/user/photo-profile
Description : Update photo-profile with use JsonWebToken

Header
```
{
    'Authorization' : Bearer <JsonWebToken>,
    'Content-Type' : 'application/json'
    'Content-Type' : 'multipart/form-data'
}
```

Request Body
```
photo_profile_image
```

Response 
```
{
    'message' : 'user photo profile updated succesfully'
}
```

============= MESSAGE =============


1. UPDATE Photo Profile

Method : 'PUT' 
URL : api/user/photo-profile
Description : Update photo-profile with use JsonWebToken
Header
```
{
    'Authorization' : Bearer <JsonWebToken>,
    'Content-Type' : 'application/json'
}
```

Request Body

```
photo_profile_image
```

Response 
```
{
    'message' : 'user photo profile updated succesfully'
}
```
Error Response 
```
{
    'error' : {
        'message' : 'invalid credential'
    }
}
```

============= COLLECTION =============
================ LIKE ================
============== PAINTING ==============
============== MESSSAGE ==============


2. sendMessage 
Method : 'POST'
URL :
HEADERS

{
    "Authorization" : Bearer <token>
}

Request 
```
{
    
}
```