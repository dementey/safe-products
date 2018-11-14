import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/Navbar.css';

import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const toHome = props => <Link to="/" {...props} />;
const toAbout = props => <Link to="/about" {...props} />;
const toIngCheck = props => <Link to="/ingrecheck" {...props} />;

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
    },
});

//console.log('NavBar this.props ' + this.props);

const NavBar = () =>
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
        <MuiThemeProvider theme={theme}>
            <li className="nav-item nav-li">
                <Button component={toHome} color="primary">
                    Начало
                </Button>
            </li>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto ">

                    <li className="nav-item nav-li">
                        <Button component={toIngCheck} color="primary">Проверка ингридиента</Button>
                    </li>

                    <li className="nav-item nav-li">
                        <Button component={toAbout} color="primary">О выпускном проекте</Button>
                    </li>

                </ul>
            </div>
        </MuiThemeProvider>
    </nav>


export default NavBar;