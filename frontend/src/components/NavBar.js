import React from 'react';
import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className='music-share-logo-text navbar-brand mb-1'
               href='/'>
                MusicShare
            </a>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link to='/'>
                        <a class="nav-link" href="#">Home</a>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                    </li>
                </ul>
                <span class="navbar-text">
                    The best way to discover new playlists
                </span>
            </div>
        </nav>
    )
};

export default NavBar;