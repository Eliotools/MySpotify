import { Button, IconButton, Switch } from "@mui/material"
import { useNavigate } from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import { useState } from "react";
export const Header = ({ setType, CallDevice, played }) => {
    const [localType, setLocalType] = useState(false)
    const navigate = useNavigate(null);

    const handleType = () => {
        setLocalType(!localType)
        setType(!localType)
    }
    return (
        <div className='header'>
            <Button onClick={() => navigate(`/MySpotify?clientid=ce54a352d2be4cf59e6de5180c7a351c`)}>Reload Token</Button>
            <Switch value={localType} onChange={() => handleType()} />
            {localType ? 'Play' : 'Queue'}
            <IconButton onClick={async () => await CallDevice()}>
                {
                    played ? played.actions ?
                        played.actions.disallows.pausing ? <PlayArrowIcon /> : <PauseIcon />
                        : <StopIcon /> : <StopIcon />
                }
            </IconButton>
        </div>
    )
}