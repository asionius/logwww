import fetch from '../common/fetch'

export function login(data) {
    return fetch({
        url: "login",
        method: "post",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        data
    })
}
export function search(data) {
    return fetch({
        url: "_search",
        method: "post",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        data
    })
}
export function signup(data) {
    return fetch({
        url: "signup",
        method: "post",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        data
    })
}