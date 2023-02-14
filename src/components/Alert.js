import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';



function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export const MySnackbar = ({open, text}) => {
    return (
        <Snackbar
            open={open}
            TransitionComponent={SlideTransition}
            message={text}
        />
    );
}