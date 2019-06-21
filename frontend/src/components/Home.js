import React from 'react'
import {Redirect} from 'react-router'
import PlaylistItem from './PlaylistItem'
import PlaylistService from '../services/PlaylistService';
import Cookies from 'js-cookie'

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.playlistService = PlaylistService.getInstance();

        this.state = {
            favoritePlaylists: [],
            recentPlaylists: [],
            user: Cookies.get('user')
        };
        this.fetchPlaylists();
    }

    render() {
        if (!this.props.user) {
            return (
                <Redirect to='/login'/>
            );
        }
        return (
            <div className='mt-4 container'>
                <h3 className='my-3'>My Favorite Playlists:</h3>
                <div>
                    {this.renderPlaylists(this.state.favoritePlaylists)}
                </div>
                <h3 className='my-3'>Recently Added Playlists:</h3>
                <div>
                    {this.renderPlaylists(this.state.recentPlaylists)}
                </div>
            </div>
        );
    }

    toggleFavorite = (playlist) => {
        if (playlist.isFavorited) {
            this.playlistService.deleteFavoritePlaylist(this.state.user, playlist.id)
        } else {
            this.playlistService.favoritePlaylist(this.state.user, playlist.id)
        }
        this.setState({favoritePlaylists: [], recentPlaylists: []});
        this.sleep(50).then(() => this.fetchPlaylists())

    };

    renderPlaylists = (playlists) => {
        return playlists.map(playlist =>
            <PlaylistItem playlist={playlist} isFavorited={playlist.isFavorited} isAuthor={playlist.author == this.state.user}
                toggleFavorite={this.toggleFavorite}/>
        )
    };

    fetchPlaylists = () => {
        this.playlistService.getFavoritePlaylistsByUser(this.state.user).then((res) => {
            let playlists = [];
            for (let i in res) {
                res[i].id = i;
                res[i].isFavorited = true;
                playlists.push(res[i]);
            }
            console.log(playlists);
            this.setState({favoritePlaylists: playlists});

            this.playlistService.getRecent().then((res) => {

                console.log(res);

                let playlists = [];
                for (let i in res) {
                    res[i].id = i;
                    if (this.state.favoritePlaylists.find(favorite => favorite.id == res[i].id)) {
                        res[i].isFavorited = true;
                    } else {
                        res[i].isFavorited = false;
                    }
                    playlists.push(res[i]);
                }
                console.log(playlists);
                this.setState({recentPlaylists: playlists});
            });
        });
    }

    sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}