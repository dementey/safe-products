import React from 'react';

import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import '../../css/Footer.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
    },
    typography: {
        useNextVariants: true,
      },
});

const Footer = () =>
    <div className='footer'>
        <MuiThemeProvider theme={theme}>
            <Typography variant='body2' color="primary">
                Дмитрий Гайдук 2018
        </Typography>
        </MuiThemeProvider>
    </div>;


export default Footer;