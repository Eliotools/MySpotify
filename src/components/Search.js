import { MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react"
import { SearchItem } from "../API.js"

export const Search = ({ playSong, Token }) => {

    const [info, setInfo] = useState([])
    const [type, setType] = useState('track')
    const [search, setSearch] = useState('')
    const [hidden, setHidden] = useState(false)

    const handleSearch = async (e) => {
        setSearch(e.target.value)
        const res = await SearchItem(Token, e.target.value, 'track')
        setInfo(res.tracks.items)
    }


    return (
        <div className={'playlist ' + (hidden ? ' hidden' : null)}>
            <p onClick={() => setHidden(!hidden)}>SEARCH</p>
            <div className={'flex ' + (hidden ? ' show' : null)}>
                <TextField variant="filled" focused style={{ margin: 20 }} value={search} onChange={(e) => handleSearch(e)} />
                <Select placeholder="Type" value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value={'track'}>Track</MenuItem>
                    <MenuItem value={'album'}>Album</MenuItem>
                </Select>
            </div>
            <div className="scroll">
                {info.length !== 0 ? info.map((item, index) => {
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