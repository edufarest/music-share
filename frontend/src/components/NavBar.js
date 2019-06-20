import React from 'react';
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'


const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className='music-share-logo-text navbar-brand mb-1'
               href='/'>
                MusicShare
            </a>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to='/'>
                            <a className="nav-link" href="#">Home</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/profile'>
                            <a className="nav-link" href="#">Profile</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/createPlaylist'>
                            <a className="nav-link" href="#">Create A Playlist</a>
                        </Link>
                    </li>
                </ul>
                <span className="navbar-text">
                    The best way to discover new playlists
                </span>
                {renderProfileStatus()}

            </div>
        </nav>
    )
};

const onLogout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    window.location.reload();
};

const renderProfileStatus = () => {
    let user = Cookies.get('user');
    if (user) {
        return (
            <div>
                <button className='btn btn-light mr-3 float-right' onClick={() => onLogout()}>
                    Logout
                </button>
                <h5 className='pl-5 pr-3 mt-2 float-right'>Logged in as: {user}</h5>
            </div>
        )
    }
};

export default NavBar;