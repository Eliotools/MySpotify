import { useEffect, useState } from "react"
import { Played } from "../components/Played"
import { LetPlay, getInfo, startPlayQueue } from "../API"
import { RecentlyPlayed } from "../components/RecentlyPlayed";
import { Queue } from "../components/Queue";
import { MySnackbar } from "../components/Alert";
import { Search } from "../components/Search";
import { Header } from "../components/Header";

export const Main = () => {
    const query = window.location.href.split('/')[5].replace('%20', ' ')
    const Token = query.split('&')[1]
    const [played, setPlayed] = useState()
    const [error, setError] = useState(true)
    const [type, setType] = useState(false)
    const [alert, setalert] = useState({ open: false, text: '' })

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
        const func = startPlayQueue

        if (!played) {
            return

        }
        await func(Token, played.device.id, [track.uri])
        handleAlert(track.name, type ? 'play' : 'queu')

    }

    const handleAlert = (song, type) => {
        setalert({
            open: true,
            text: `${song} juste ${type === 'play' ? 'start' : 'add to queue'}`
        })
        setTimeout(() => { setalert({ open: false, text: '' }) }, 10000)
    }


    return (
        <div className='main container'>
            <Header switchType={setType} CallDevice={CallDevice} played={played}></Header>

            <p hidden={error}>Aucun device connecter<br />Lancer une music sur spotify</p>

            <div className="list-container">
                <RecentlyPlayed playSong={playSong} Token={Token}></RecentlyPlayed>
                <Search playSong={playSong} Token={Token} ></Search>
                <Queue playSong={playSong} Token={Token}></Queue>
            </div>
            <Played info={played ? played.item : null}></Played>

            <MySnackbar open={alert.open} text={alert.text}></MySnackbar>
        </div>
    )
}
