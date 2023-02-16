import { useEffect, useState } from "react"
import { getQueue } from "../API.js"

export const Queue = ({ playSong, Token }) => {

    const [info, setInfo] = useState()
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        const loadAsync = async () => {
            const list = await getQueue(Token)
            setInfo(list)

            setTimeout(() => loadAsync(), 6000)
        }

        loadAsync()
    }, [Token])


    return (
        <div className={'playlist ' + (hidden ? ' hidden' : null)}>
            <p onClick={() => setHidden(!hidden)}>QUEUE</p>
            <div className="scroll">
                {info ? info.queue.map((item, index) => {
                    return (
                        <div className='item-list' onClick={() => playSong(item)} key={index}>
                            <img src={item.album.images[0].url} alt='album'></img>
                            <div style={{ paddingLeft: "10px" }}>
                                <p>{item.name}</p>
                                <p>{item.artists ? item.artists[0].name : null}</p>
                            </div>
                        </div>
                    )
                }) : null}
            </div>
        </div>
    )
}