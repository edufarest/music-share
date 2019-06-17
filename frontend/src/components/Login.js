import React from 'react'
import '../styles/Login.css'
import {Redirect} from 'react-router'

const Login = ({session}) => {
    if (session) {
        return (
            <Redirect to='/'/>
        );
    }

    return (
      <div className='mt-5 container'>
          <form>
              <h1 className='pb-3'>
                  Login to MusicShare
              </h1>
              <div className='row form-group'>
                  <label for='usernameField'
                         className='mt-1 mr-5 music-share-login-label music-share-text col-1' >Username: </label>
                  <input className='form-control col-10' id='usernameField' placeholder='username'/>
              </div>
              <div className='row form-group'>
                  <label for='passwordField'
                         className='mt-1 mr-5 music-share-login-label music-share-text col-1' >Password: </label>
                  <input className='form-control col-10' id='passwordField' placeholder='password'/>
              </div>
              <button onClick={console.log('click')} className="mt-1 btn music-share-button">Login</button>
          </form>
      </div>
    );
};

export default Login;