const key = 'key'

export function getInfo() {
  return localStorage.getItem(key)
}

export function setInfo(k) {
  return localStorage.setItem(key, k)
}

export function removeInfo() {
  return localStorage.removeItem(key)
}

