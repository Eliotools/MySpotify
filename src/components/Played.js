export const Played = (info) => {
    if (info.info === undefined || info.info === null || info.info.error)
        return
    return (
        <div className='lisen'>
            <img src={info.info.album.images[1].url} alt='Music'></img>
            <p>{info.info.name}</p>
        </div>
    )
}