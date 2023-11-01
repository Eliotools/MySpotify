import { useEffect, useState } from "react"
import { getPlaylist } from "../API.js"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
export const RecentlyPlayed = ({ playSong, Token }) => {

    const [info, setInfo] = useState()
    const [hidden, setHidden] = useState(false)


    useEffect(() => {
        const loadAsync = async () => {
            const list = await getPlaylist(Token).then(res => res.error ? [] : res.items)
            setInfo(list)
            setTimeout(() => loadAsync(), 60000)
        }

        loadAsync()
    }, [Token])


    return (
        <div className={'playlist ' + (hidden ? ' hidden' : null)}>
            <p className={"title"} onClick={() => setHidden(!hidden)}>LAST PLAYED</p>
            <div className="scroll">
                {info !== undefined ? info.map((item, index) => {
                    return (
                        <div className='item-list' key={index}>
                            <img src={item.track.album.images[0].url} alt='album'></img>
                            <div style={{ paddingLeft: "10px" }}>
                                <p>{item.track.name}</p>
                                <p>{item.track.artists ? item.track.artists[0].name : null}</p>
                            </div>
                            <div className='flex play'>
                                <PlayCircleOutlineIcon onClick={(e) => playSong(item.track)} color="secondary" />
                            </div>
                        </div>
                    )
                }) : null}
            </div>
        </div >
    )
}