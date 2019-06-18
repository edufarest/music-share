import React from 'react';
import {Redirect} from 'react-router'
import PlaylistItem from './PlaylistItem'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userPlaylists: [
                {
                    name: 'Real Dope Playlist',
                    author: 'shapdor',
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
                            genre: 'hip-hop, hardcore hip-hop'
                        },
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
                            genre: 'hip-hop, hardcore hip-hop'
                        },
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
                            genre: 'hip-hop, hardcore hip-hop'
                        },
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
                            genre: 'hip-hop, hardcore hip-hop'
                        },
                    ]
                }
            ]
        }
    }

    render() {
        if (!this.props.user) {
            return (
                <Redirect to='/login'/>
            );
        }

        return(
            <div className='mt-4 container'>
                <h2>Profile for {this.props.user}</h2>
                <h3 className='my-3'>My Playlists:</h3>
                <div>
                    {this.state.userPlaylists.map(playlist => <PlaylistItem playlist={playlist}/>)}
                </div>
            </div>
        )
    }
}