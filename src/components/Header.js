import { Button, IconButton, Switch, colors } from "@mui/material"
import { useNavigate } from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import { useState } from "react";
export const Header = ({ switchType, CallDevice, played }) => {
    const [localType, setLocalType] = useState(false)

    const handleType = () => {
        setLocalType(!localType)
        switchType(!localType)
        console.log(!localType)
    }
    return (
        <div className='header'>
            <p>Welcome to My Spotify</p>
        </div>
    )
}