import { useNavigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../constant/colors';
import { getUserInfo } from '../API';
import "../constant/style.css"

const scope = [
  "user-read-playback-state",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-recently-played",
  "user-library-read",
  "playlist-read-private"
].join(' ')

//const redirect = "https://eliotools.github.io/MySpotify/"
const redirect = "http://localhost:3000/MySpotify/"

export const Home = () => {
  const [token, setToken] = useState()
  const [clientId, setClientId] = useState("")
  const navigate = useNavigate();
  const url = useMemo(() => new URL(window.location.href), [] )

  useEffect(() => {
    if (url.searchParams.get('clientid'))
      OpenNav(url.searchParams.get('clientid'))
    if (url.hash){
        const hash = url.hash.split('=')[1].split('&')[0]
        setToken(hash)
      }
    return
  }, [url])

  useEffect(() => {
    if (!token)
      return

    const getInfo = async () => {
      const res = await getUserInfo(token)
      navigate(`Main/${res.display_name}&${token}`)
    }
    getInfo()
  })

  const OpenNav = (clientId) => {
    window.open(`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirect}&response_type=token&scope=${scope}`, "_self")
  }


  return (
    <div className="container flex">
      <div className="card xl">
        <p>Welcome to</p>
        <p className='xxl'><code>My Spotify</code></p>
        <div className='separator'></div>
        <p>Please connect yourself</p>
        <ThemeProvider theme={theme}>
          <TextField label="Client Id" variant="filled" color="primary" focused style={{margin : 20}} value={clientId} onChange={(e) => setClientId(e.target.value)}/>
          <Button variant="outlined" color="primary" onClick={() => OpenNav(clientId)}>Connect</Button>
        </ThemeProvider>
      </div>
    </div>
  );
}

