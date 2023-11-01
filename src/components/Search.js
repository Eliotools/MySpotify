import { MenuItem, Select, TextField, InputAdornment } from "@mui/material"
import { useState } from "react"
import { SearchItem } from "../API.js"
import SearchIcon from '@mui/icons-material/Search';

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
            <p className={"title"} onClick={() => setHidden(!hidden)}>SEARCH</p>
            <div className={'flex ' + (hidden ? ' show' : null)}>
                <TextField
                    style={{ background: "rgb(22, 22, 22)", borderRadius: "5%" }}
                    variant="standard"
                    value={search}
                    onChange={(e) => handleSearch(e)}
                    label="What do you want to listen to ?"
                    color="secondary"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="secondary" />
                            </InputAdornment>
                        ),
                    }}
                />
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