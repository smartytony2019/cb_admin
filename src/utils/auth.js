import Cookies from 'js-cookie'

const TokenKey = 'admin_token'

export function getToken(key) {
  key = key == undefined ? TokenKey : key;
  return Cookies.get(key)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
