import React from 'react';
import {Link} from 'react-router-dom'

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
            </div>
        </nav>
    )
};

export default NavBar;