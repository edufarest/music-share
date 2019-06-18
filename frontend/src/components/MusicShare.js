import React from 'react'
import NavBar from './NavBar'
import Home from './Home'
import Login from './Login'
import Profile from './Profile'
import CreatePlaylist from './CreatePlaylist'
import '../styles/MusicShare.css'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {Redirect} from 'react-router'
import Cookies from 'js-cookie'

export default class MusicShare extends React.Component {
    constructor(props) {
        super(props);
        let userCookie = Cookies.get('user');
        this.state = {
            user: userCookie
        }
    }

    render() {
            return (
                <div>
                    <Router>
                        {this.checkSession()}
                        <NavBar/>
                        <Route exact path='/' component={() => <Home user={this.state.user}/>}/>
                        <Route path='/login' component={() => <Login user={this.state.user}/>}/>
                        <Route path='/createPlaylist' component={() => <CreatePlaylist user={this.state.user}/>}/>
                        <Route path='/profile' component={() => <Profile user={this.state.user}/>}/>
                    </Router>
                </div>
            );

    }

    checkSession = () => {
        if (!this.state.user) {
            return (
                <Redirect to="/login"/>
            )
        }
    };
}
