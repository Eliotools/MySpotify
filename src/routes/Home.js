import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../constant/colors';
import { env } from '../constant/config';
import { getUserInfo } from '../API/login';
import "../constant/style.css"

export const Home = () => {
  const [token, setToken] = useState()
  const navigate = useNavigate();
  const url = queryString.parse(window.location.href.split('#')[1])

  useEffect(() => {
    if (url.access_token)
      setToken(url.access_token)
  }, [url])

  useEffect(() => {
    if (!token)
      return

    const getInfo = async () => {
      const res = await getUserInfo(token)
      console.log(res)
      navigate(`/Main/${res.display_name}`)
    }
    getInfo()
  })

  return (
    <div className="container flex">
      <div className="card xl">
        <p>Welcome to</p>
        <p className='xxl'><code>My Spotify</code></p>
        <div className='separator'></div>
        <p>Please connect yourself</p>
        <ThemeProvider theme={theme}>
          <Button variant="outlined" color="primary" onClick={() => window.open(`https://accounts.spotify.com/authorize?client_id=${env.CLIENT_ID}&redirect_uri=${env.URI}/&response_type=token&scope=user-read-recently-played`, "_self")}>Connect</Button>
        </ThemeProvider>
      </div>
    </div>
  );
}

