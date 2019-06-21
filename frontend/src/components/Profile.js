import React from 'react';
import {Redirect} from 'react-router'
import PlaylistItem from './PlaylistItem'
import PlaylistService from '../services/PlaylistService'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.playlistService = PlaylistService.getInstance();

        this.state = {
            userPlaylists: [
                {
                    name: 'Real Cool Playlist',
                    author: 'john',
                    length: '43:23',
                    primaryGenre: 'hip hop',
                    loudness: '0.73',
                    danceability: '0.43',
                    happiness: '0.48',
                    isAuthor: true,
                    isFavorited: true,
                    tracks: [
                        {
                            name: 'Them Changes',
                            artist: 'Thundercat',
                            length: '3:41',
                            genre: 'jazz, funk'
                        },
                        {
                            name: 'DNA',
                            artist: 'Kendrick Lamar',
                            length: '2:56',
                            genre: 'hip hop, hardcore hip hop'
                        },
                        {
                            name: 'Mind Mischief',
                            artist: 'Tame Impala',
                            length: '4:23',
                            genre: 'psychedelic rock'
                        },
                        {
                            name: '1539 N. Calvert',
                            artist: 'JPEGMAFIA',
                            length: '2:37',
                            genre: 'glitch hop'
                        },
                        {
                            name: 'Reborn',
                            artist: 'KIDS SEE GHOSTS',
                            length: '3:42',
                            genre: 'hip hop, psychedelic hip hop'
                        },
                        {
                            name: 'Breathing Underwater',
                            artist: 'Hiatus Kaiyote',
                            length: '5:36',
                            genre: 'future soul, neo-soul'
                        },
                        {
                            name: 'EARFQUAKE',
                            artist: 'Tyler, The Creator',
                            length: '3:10',
                            genre: 'R&B, hip hop'
                        },
                        {
                            name: 'Decks Dark',
                            artist: 'Radiohead',
                            length: '3:41',
                            genre: 'art rock, rock'
                        },
                    ]
                }
            ],
            emailField: '',
            passwordField: ''
        };

        this.playlistService.getPlaylistsByUser(this.props.user).then(playlists => {
            this.setState({userPlaylists: playlists});
        });

    }

    render() {
        if (!this.props.user) {
            return (
                <Redirect to='/login'/>
            );
        }

        return(
            <div className='mt-4 container'>
                <h1>Profile for {this.props.user}</h1>
                <h3 className='my-3'>My Playlists:</h3>
                <div>
                    {this.state.userPlaylists.map(playlist => <PlaylistItem playlist={playlist} toggleFavorite={null}/>)}
                </div>
                <h3 className='mt-3'>Change Your E-mail</h3>
                <input className='form-control'
                       id='emailField'
                       placeholder='new e-mail...'
                       value={this.state.usernameField}
                       onChange={event => this.setState({emailField: event.target.value})}/>
                <button onClick={() => this.props.onLogin(this.state.usernameField, this.state.passwordField)}
                        className="mt-1 btn music-share-button">Confirm E-mail</button>
                <h3 className='mt-3'>Change Your Password</h3>
                <input className='form-control'
                       id='passwordField'
                       placeholder='new password...'
                       type='password'
                       value={this.state.passwordField}
                       onChange={event => this.setState({passwordField: event.target.value})}/>
                <button onClick={() => this.props.onLogin(this.state.usernameField, this.state.passwordField)}
                        className="mt-1 btn music-share-button">Confirm Password</button>
            </div>
        )
    }
}