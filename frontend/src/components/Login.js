import React from 'react'
import '../styles/Login.css'
import {Redirect} from 'react-router'
import AuthService from '../services/AuthService'
import Cookies from "js-cookie";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameField: '',
            passwordField: '',
            usernameRegisterField: '',
            passwordRegisterField: '',
            emailRegisterField: ''
        }
    }

    render() {
        if (this.props.user) {
            return (
                <Redirect to='/'/>
            );
        }

        return (
            <div className='mt-5 container'>
                    <h1 className='pb-3'>
                        Login to MusicShare
                    </h1>
                    <div className='row form-group'>
                        <label for='usernameField'
                               className='mt-1 mr-5 music-share-login-label music-share-text col-1' >Username: </label>
                        <input className='form-control col-10'
                               id='usernameField'
                               placeholder='username'
                               value={this.state.usernameField}
                               onChange={event => this.setState({usernameField: event.target.value})}/>
                    </div>
                    <div className='row form-group'>
                        <label for='passwordField'
                               className='mt-1 mr-5 music-share-login-label music-share-text col-1' >Password: </label>
                        <input className='form-control col-10'
                               id='passwordField'
                               placeholder='password'
                               type='password'
                               value={this.state.passwordField}
                               onChange={event => this.setState({passwordField: event.target.value})}/>
                    </div>
                    <button onClick={() => this.props.onLogin(this.state.usernameField, this.state.passwordField)}
                            className="mt-1 btn music-share-button">Login</button>
                    <h1 className='mt-5 pb-3'>
                        Register for MusicShare
                    </h1>
                    <div className='row form-group'>
                        <label for='usernameRegisterField'
                               className='mt-1 mr-5 music-share-login-label music-share-text col-1' >Username: </label>
                        <input className='form-control col-10'
                               id='usernameRegisterField'
                               placeholder='username'
                               value={this.state.usernameRegisterField}
                               onChange={event => this.setState({usernameRegisterField: event.target.value})}/>
                    </div>
                    <div className='row form-group'>
                        <label for='passwordRegisterField'
                               className='mt-1 mr-5 music-share-login-label music-share-text col-1' >Password: </label>
                        <input className='form-control col-10'
                               id='passwordRegisterField'
                               placeholder='password'
                               type='password'
                               value={this.state.passwordRegisterField}
                               onChange={event => this.setState({passwordRegisterField: event.target.value})}/>
                    </div>
                    <div className='row form-group'>
                        <label for='emailRegisterField'
                               className='mt-1 mr-5 music-share-login-label music-share-text col-1' >E-Mail: </label>
                        <input className='form-control col-10'
                               id='emailRegisterField'
                               placeholder='email'
                               type='email'
                               value={this.state.emailRegisterField}
                               onChange={event => this.setState({emailRegisterField: event.target.value})}/>
                    </div>
                    <button onClick={() => this.props.onRegister(this.state.usernameRegisterField,
                        this.state.passwordRegisterField, this.state.emailRegisterField)}
                            className="mt-1 btn music-share-button">Register</button>
            </div>
        );

    }

}