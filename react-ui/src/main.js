import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import NavBar from './Components/LandingPage/Home/NavBar';
import Footer from './Components/LandingPage/Home/Footer';

import About from './Components/LandingPage/About/About';
import Home from './Components/LandingPage/Home/Home';
import SearchPage from './Components/LandingPage/SearchPage/SearchPage';
import IngreCheck from './Components/LandingPage/IngredientsCheck/IngredientsCheck';
import NotFound from './Components/LandingPage/NotFound/NotFound';
import SearchForm from './Components/LandingPage/Home/SearchForm/SearchForm';


const Main = () =>
    <Router>
        <div className='container'>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/search/" component={SearchPage} />
                <Route path="/search?:id" component={SearchForm} />
                <Route path="/ingrecheck" component={IngreCheck} />
                <Route path="/api"  />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </div>
    </Router>;

export default Main;
