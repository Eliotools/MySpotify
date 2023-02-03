import { env } from "../constant/config"
import queryString from "query-string"

//SERVER SIDE
export const login = async (code) => {
    fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        body: queryString.stringify({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: env.URI,
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + env.BASE64_AUTH,
        },

    }).then(res => {
        console.log(res.status)
        return res.json()
    })
}


//FRONT SIDE
export const getUserInfo = async (token) => {
    const url = `https://api.spotify.com/v1/me`
    return fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },

    }).then(res => res.json())
}