import { useEffect, useState } from "react"
import { getQueue } from "../API.js"

export const Queue = ({ playSong, Token }) => {

    const [info, setInfo] = useState()
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        const loadAsync = async () => {
            const list = await getQueue(Token).then(res => res.error ? [] : res.queue)
            setInfo(list)

            setTimeout(() => loadAsync(), 30000)
        }

        loadAsync()
    }, [Token])


    return (
        <div hidden className={'playlist ' + (hidden ? ' hidden' : null)}>
            <p className={"title"} onClick={() => setHidden(!hidden)}>QUEUE</p>
            {hidden ? null : <>
            <div className="scroll">
                {info ? info.map((item, index) => {
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
            </div> </>}
        </div>
    )
}