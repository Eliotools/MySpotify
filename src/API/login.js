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

export const getInfo = async (token) => {
    const url = `https://api.spotify.com/v1/me/player`
    return fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },

    }).then(res => {
        if (res.status === 204)
            return null
        return res.json()
    })
}

export const LetPlay = async (token, deviceId, isPlayig) => {
    const play = isPlayig ? 'pause' : 'play'
    const url = `https://api.spotify.com/v1/me/player/${play}?device_id=${deviceId}`
    return fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
            "position_ms": 0
        })
    }).then(res => res.status)
}

export const getPlaylist = (token) => {
    const timestamp = Date.now()
    const url = `https://api.spotify.com/v1/me/player/recently-played?before=${timestamp}&limit=20`
    return fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },

    }).then(res => res.json().then(res => res))
}