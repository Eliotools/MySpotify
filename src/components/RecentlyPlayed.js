
export const RecentlyPlayed = ({ info }) => {
    if (info === undefined)
        return

    return (
        <div className='playlist'>
            LAST PLAYED
            {info.items.map(item => {
                return (
                    <div className='item-list'>
                        <img src={item.track.album.images[0].url} alt='album'></img>
                        <p style={{paddingLeft : "10px"}}>
                            <p>{item.track.name}</p>
                            <p>{item.track.artists ? item.track.artists[0].name : null}</p>
                        </p>
                        </div>
                )
            })}
        </div>
    )
}