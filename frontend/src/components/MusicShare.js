import React from 'react'
import NavBar from './NavBar'
import Home from './Home'
import Login from './Login'
import '../styles/MusicShare.css'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {Redirect} from 'react-router'

export default class MusicShare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }



    render() {
            return (
                <div>
                    <Router>
                        <NavBar/>
                        <Route exact path='/' component={Home}/>
                        <Route path='/login' component={Login}/>
                        {this.checkSession()}
                    </Router>
                </div>
            );

    }

    checkSession = () => {
         return (
             <Redirect to="/login"/>
         )
    };
}
