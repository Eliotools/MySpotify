import { Button, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Played } from "../components/Played"
import { LetPlay, getInfo, startPlay, startPlayQueue, getTrack, SearchDate } from "../API"
import { RecentlyPlayed } from "../components/RecentlyPlayed";
import Switch from '@mui/material/Switch';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import { Queue } from "../components/Queue";
import { MySnackbar } from "../components/Alert";
import { Search } from "../components/Search";

export const Main = () => {
    const query = window.location.href.split('/')[5].replace('%20', ' ')
    const Token = query.split('&')[1]
    const [played, setPlayed] = useState()
    const [error, setError] = useState(true)
    const [type, setType] = useState(false)
    const [alert, setalert] = useState({open : false, text : ''})
    const navigate = useNavigate(null);

    useEffect(() => {
        const loadAsync = async () => {
            const info = await getInfo(Token)
            if (!info)
                setError(false)
            setPlayed(info)

            setTimeout(() => loadAsync(), 60000)
        }

        loadAsync()
    }, [Token])



    const CallDevice = async () => {
        if (!played)
            return
        const res = await LetPlay(Token, played.device.id, !played.actions.disallows.pausing)
        if (res === 204) {
            let tmp = { ...played }
            tmp.actions.disallows.pausing = !tmp.actions.disallows.pausing
            setPlayed(tmp)
        }
    }

    const playSong = async (track) => {
        const func = type ? startPlay : startPlayQueue

        if (!played)
            return
        await func(Token, played.device.id, [track.uri])
        handleAlert(track.name, type ? 'play' : 'queu')

    }

    const playPlaylist = async () => {
        const list = await getTrack(Token).then(res => res.items[1].uri)

        if (!played)
            return
        await startPlay(Token, played.device.id, list)
        handleAlert('your playlist', 'play')
    }

    const playDate = async () => {
        const date = new Date()
        const res = await (SearchDate(Token, `${date.getHours()}:${date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes() }`)).then(res => res.tracks.items)
        if (res.length === 0)
            return
        const random = Math.floor(Math.random() * res.length);
        if (!played)
            return
        await startPlay(Token, played.device.id, [res[random].uri])
        handleAlert(res[random].name, 'play')
    }

    const handleAlert = (song, type) => {
        setalert({
            open : true,
            text : `${song} juste ${type === 'play' ? 'start' : 'add to queue'}`
        })
        setTimeout(() => {setalert({open : false, text : ''})}, 10000)
    }


    return (
        <>
            <div className='reload'>
                <Button onClick={() => navigate(`/MySpotify?clientid=ce54a352d2be4cf59e6de5180c7a351c`)}>Reload Token</Button>
                <Switch value={type} onChange={() => setType(!type)} />
                {type ? 'Play' : 'Queue'}
            </div>
            <div className='main container'>
                <IconButton onClick={async () => await CallDevice()}>
                    {
                        played ? played.actions ?
                            played.actions.disallows.pausing ? <PlayArrowIcon /> : <PauseIcon />
                            : <StopIcon /> : <StopIcon />
                    }
                </IconButton>
                <Button onClick={() => playPlaylist()}>Playlist</Button>
                <Button onClick={() => playDate()}>Get now date</Button>
                <p hidden={error}>Aucun device connecter</p>
                <div className="list-container">
                    <RecentlyPlayed playSong={playSong} Token={Token}></RecentlyPlayed>
                    <Queue playSong={playSong} Token={Token}></Queue>
                    <Search playSong={playSong} Token={Token} ></Search>
                </div>
                <Played info={played ? played.item : null}></Played>

                <MySnackbar open={alert.open} text={alert.text}></MySnackbar>
            </div>
        </>
    )
}
