import React from 'react'
import NavBar from './NavBar'
import HomePage from './HomePage'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

export default class MusicShare extends React.Component {
    render() {
        return(
            <div>
                <NavBar/>
                <Router>
                    <Route exact path='/' component={HomePage}/>
                    <h1>Hello World!</h1>
                </Router>
            </div>
        );
    }
}