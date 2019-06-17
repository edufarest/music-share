import React from 'react';
import {Redirect} from 'react-router'
import PlaylistListItem from './PlaylistListItem'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userPlaylists: [
                {
                    name: 'Real Ass Playlist',
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
        if (!this.props.session) {
            return (
                <Redirect to='/login'/>
            );
        }

        return(
            <div className='mt-4 container'>
                <h2>Profile for {this.props.session}</h2>
                <h4 className='my-3'>My Favorite Playlists:</h4>
                <div>
                    {this.state.userPlaylists.map(playlist => <PlaylistListItem playlist={playlist}/>)}
                </div>
            </div>
        )
    }
}