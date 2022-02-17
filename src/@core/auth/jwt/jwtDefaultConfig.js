// ** Auth Endpoints
export default {
  loginEndpoint: 'https://dev.webermellon.com/auth/jwt/create/',
  registerEndpoint: 'https://dev.webermellon.com/auth/users/',
  refreshEndpoint: 'https://dev.webermellon.com/auth/jwt/verify/',
  logoutEndpoint: 'https://dev.webermellon.com/jwt/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'access',
  storageRefreshTokenKeyName: 'refresh'
}
