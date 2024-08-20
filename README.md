
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
        'photo_profile' : <photo_profile>
    }
}
```

3. Get User

Method : 'GET'
URL : api/user?userId=<userId>
Decription : 'Get user data with return data ,3 images latest, and 3 collection latest '
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
    'user' : {
        'id' : <id>,
        'username' : <username>,
        'photo_profile' : https://cdn.site/src/763ydahwhdamjhhHgsj
        'like' : <like>,
        'images' : [
                {
                    'url' : <url>,
                    'id' : <id>
                },
                {
                    'url' : <url>,
                    'id' : <id>
                }
            ],
        'collectiones' : [
                {
                    'url' : <url>,
                    'id' : <id>
                },
                {
                    'url' : <url>,
                    'id' : <id>
                }
            ],
    }
}
```

4. Get Users

Method : 'GET'
URL : api/users

Headers
```
{
    'Content-Type' : 'application/json'
}
```

Request Query
```
Example : api/user
```
Response 
```
{
    'page' : <page>
    'users' : [
        {
            'id' : <id>,
            'username' : <username>,
            'photo_profile' : https://cdn.site/src/763ydahwhdamjhhHgsj
        },
        {
            'id' : <id>,
            'username' : <username>,
            'photo_profile' : https://cdn.site/src/763ydahwhdamjhhHheth
        }
    ]
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

Response Error 
```
{
    'error' : {
        'message' : 'user password updated succesfully',
        validator : {
            symbol : false,
            number : false,
            length : true,
        }
        }
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

============= COLLECTION =============


1. createCollection 
Method : 'POST'
URL : api/collection

HEADERS

{
    "Authorization" : Bearer <token>,
    'Content-Type' : 'application/json'
}

Request Body 
```
{
    'imageId' : <imageId>,
}
```

Response 
```
{
    'message' : 'success'
}
```

2. deleteCollection 
Method : 'DELETE'
URL : api/collection

HEADERS

{
    "Authorization" : Bearer <token>,
    'Content-Type' : 'application/json'
}

Request Body 
```
{
    'imageId' : <imageId>,
}
```

Response 
```
{
    'message' : 'success'
}
```

3. getCollections 
Method : 'GET'
URL : api/collections

HEADERS

{
    'Content-Type' : 'application/json'
}

Request Query 

Example : api/collections/<userId>

Response 
```
{
    'collections' : [
        {
            'imageId' : <imageId>
            'url' : <url>,
        },
        {
            'imageId' : <imageId>
            'url' : <url>,
        }
    ]
}
```

================ LIKE ================

1. createLike 
Method : 'PUT'
URL : api/like

HEADERS

{
    "Authorization" : Bearer <token>,
    'Content-Type' : 'application/json'
}

Request Body 
```
{
    'userId' : <userId>,
}
```

Response 
```
{
    'message' : 'success'
}
```

2. deleteLike 
Method : 'DELETE'
URL : api/like

HEADERS

{
    "Authorization" : Bearer <token>,
    'Content-Type' : 'application/json'
}

Request Body 
```
{
    'imageId' : <imageId>
}
```

Response 
```
{
    'message' : 'success'
}
```

================ IMAGE ===============

1. uploadImage 
Method : 'POST'
URL : api/image/upload
HEADERS

{
    "Authorization" : Bearer <token>,
    'Content-Type' : 'multipart/form-data'
    'Content-Type' : 'application/json'
}

Request Body 
```
{
    'title' : <title>,
    'description' : <description>
}
form['image']
```

Response 
```
{
    'message' : 'success'
}
```

2. deleteImage 
Method : 'DELETE'
URL :
HEADERS

{
    "Authorization" : Bearer <token>,
    'Content-Type' : 'application/json'
}

Request Query 
```
Example : api/image/:userId/:imageId
```

Response 
```
{
    'message' : 'success'
}
```

3. getImages
Method : 'GET'
URL : api/image?limit=<limit>&offset=<offset>

HEADERS
{
    'Content-Type' : 'application/json'
}

Request Query 
```
Example : api/api/image?limit=5&offset=15
```

Response 
```
{
    'images' : {
        'imageId' : <imageid>,
        'url' : <url>,
    },
    {
        'imageId' : <imageid>,
        'url' : <url>,
    }
}
```

4. getImageData
Method : 'GET'
URL : api/image/<imageId>
Description : 'get image data header auth to get data liked and collectioned'

HEADERS
{
    'Authorization' : 'Bearer <token>' <--- OPTIONAL --->
    'Content-Type' : 'application/json'
}

Request Query 
```
Example : api/image/<imageId>
```

Response 
```
{
    'image' : {
        'id' : <id>,
        'title' : <title>,
        'descriptio' : <description>
    }
}
```

============== MESSSAGE ==============

1. createRoom 
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

2. sendMessage 
Method : 'POST'
URL :
HEADERS

{
    "Authorization" : Bearer <token>,
    'Content-Type' : 'application/json'
}

Request Body 
```
{
    'userid_target' : <userId>,
    'message' : <message>
}
```

Response 
```
{
    'message' : 'success'
}
```

3. getMessage 
Method : 'POST'
URL :
HEADERS

{
    "Authorization" : Bearer <token>
}

Request 
```
{
    'userId' : <userid>,
    'latest' : 'true',
    'count' : 5
}
```