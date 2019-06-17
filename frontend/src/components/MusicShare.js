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
            user: "test"
        }
    }

    render() {
            return (
                <div>
                    <Router>
                        {this.checkSession()}
                        <NavBar/>
                        <Route exact path='/' component={() => <Home session={this.state.user}/>}/>
                        <Route path='/login' component={() => <Login session={this.state.user}/>}/>
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
