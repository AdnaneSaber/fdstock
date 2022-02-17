// ** Auth Endpoints
export default {
  loginEndpoint: 'http://127.0.0.1:8000/auth/jwt/create/',
  registerEndpoint: 'http://127.0.0.1:8000/auth/users/',
  refreshEndpoint: 'http://127.0.0.1:8000/auth/jwt/verify/',
  logoutEndpoint: 'http://127.0.0.1:8000/jwt/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'access',
  storageRefreshTokenKeyName: 'refresh'
}
