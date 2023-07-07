// ** Auth Endpoints
export default {
  loginEndpoint: 'http://localhost:8000/login/',
  registerEndpoint: 'http://localhost:8000/signup/',
  refreshEndpoint: 'http://localhost:8000/auth/jwt/verify/',
  logoutEndpoint: 'http://localhost:8000/jwt/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'access',
  storageRefreshTokenKeyName: 'refresh'
}
