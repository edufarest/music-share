import React from 'react'
import {Redirect} from 'react-router'
import PlaylistItem from './PlaylistItem'

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            favoritePlaylists: [
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
            ],
            recentPlaylists: [
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
                    ]
                }
            ],
        };
    }

    render() {
        if (!this.props.user) {
            return (
                <Redirect to='/login'/>
            );
        }
        return (
            <div className='mt-4 container'>
                <h4 className='my-3'>My Favorite Playlists:</h4>
                <div>
                    {this.renderPlaylists(this.state.favoritePlaylists)}
                </div>
                <h4 className='my-3'>Recently Added Playlists:</h4>
                <div>
                    {this.renderPlaylists(this.state.recentPlaylists)}
                </div>
            </div>
        );
    }

    renderPlaylists = (playlists) => {
        return playlists.map(playlist =>
            <PlaylistItem playlist={playlist} isFavorited={false} isAuthor={playlist.author == this.props.session}/>
        )
    }


}