import fetch from '../common/fetch'

export function login(data) {
    return fetch({
        url: "_login",
        method: "post",
        data
    })
}
export function search(data) {
    return fetch({
        url: "_search",
        method: "post",
        data
    })
}
export function signup(data) {
    return fetch({
        url: "_signup",
        method: "post",
        data
    })
}