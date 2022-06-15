# node-express-oauth2-jwt-bearer

## POSTMAN

### get token post to ``` https://dev-l-mi0e-3.us.auth0.com/oauth/token ```
```
  body {"client_id":"wZUBpxHiMX99lw1ZRs0Ivwwl7KTmAlwl","client_secret":"rU-OezLJK_VmoDq0HQB7IE1te3j96SUU_j9P69mB67LUfm-21cCTuPygf9Kq9tA_","audience":"https://dev-l-mi0e-3.us.auth0.com/api/v2/","grant_type":"client_credentials"}
```

### copy token to private route get method

```
  http://localhost:3001/api/private
  bearer token set previous token of response
```