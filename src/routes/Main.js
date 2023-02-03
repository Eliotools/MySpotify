export const Main = () => {
    const username = window.location.href.split('/')[4].replace('%20', ' ')

    return (
        <div className='main container xxl'>
            {username}
        </div>
    )
}