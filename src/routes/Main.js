import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Played } from "../components/Played"
import { LetPlay, getInfo, getPlaylist } from "../API/login"
import { RecentlyPlayed } from "../components/RecentlyPlayed";

export const Main = () => {
    const query = window.location.href.split('/')[5].replace('%20', ' ')
    const [Name, Token] = query.split('&')
    const [played, setPlayed] = useState({})
    const [playlist, setPlaylist] = useState()
    const [error, setError] = useState(true)
    const navigate = useNavigate(null);

    useEffect(() => {loadAsync()}, [])


    const loadAsync = async () => {
        const info = await getInfo(Token)
        if (!info)
            setError(false)
        setPlayed(info)

        const list = await getPlaylist(Token)
        setPlaylist(list)

        setTimeout(() => loadAsync(), 60000)
    }


    const CallDevice = async () => {
        const res = await LetPlay(Token, played.device.id, !played.actions.disallows.pausing)
        if (res === 204) {
            let tmp = { ...played }
            tmp.actions.disallows.pausing = !tmp.actions.disallows.pausing
            setPlayed(tmp)
        }
    }

    return (
        <>
            <Button className='reload' onClick={() => navigate(`/MySpotify?clientid=ce54a352d2be4cf59e6de5180c7a351c`)}>Reload Token</Button>
            <div className='main container'>
                <p className='xxl'>{Name}</p>
                <Button onClick={async () => await CallDevice()}>Start / Pause</Button>
                <Played info={played ? played.item : null}></Played>
                <p hidden={error}>Aucun device connecter</p>
                <RecentlyPlayed info={playlist}></RecentlyPlayed>
            </div>
        </>
    )
}