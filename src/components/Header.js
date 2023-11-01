import { useState } from "react";
export const Header = () => {
    const [localType, setLocalType] = useState(false)

    return (
        <div className='header'>
            <p className="title">Welcome to My Spotify</p>
        </div>
    )
}