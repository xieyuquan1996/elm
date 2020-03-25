
export function getLocalStorage(key){
    return localStorage.getItem(key)
}

export function setLocalStorage(key,val){
    localStorage.setItem(key, val)
}

export function deleteLocalStorage(key){
    localStorage.removeItem(key)
}