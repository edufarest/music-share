import React from 'react'
import {Redirect} from 'react-router'
import PlaylistItem from './PlaylistItem'
import PlaylistService from '../services/PlaylistService';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.playlistService = PlaylistService.getInstance();

        this.playlistService.getRecent().then((res) => {
            console.log(res);
        });
        //
        // dislikes: 0
        // isPrivate: {type: "Buffer", data: Array(1)}
        // length: 0
        // likes: 0
        // name: "the playlist"
        // numSongs: 0
        // playlistId: 2
        // primaryGenre: ""

        this.state = {
            favoritePlaylists: [
                {
                    name: 'Real Cool Playlist',
                    author: 'john',
                    length: '43:23',
                    primaryGenre: 'hip hop',
                    loudness: '0.73',
                    danceability: '0.43',
                    happiness: '0.48',
                    isAuthor: false,
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
            recentPlaylists: [
                {
                    name: 'Real Cool Playlist',
                    author: 'john',
                    length: '43:23',
                    primaryGenre: 'hip hop',
                    loudness: '0.73',
                    danceability: '0.43',
                    happiness: '0.48',
                    isAuthor: false,
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

    renderPlaylists = (playlists) => {
        return playlists.map(playlist =>
            <PlaylistItem playlist={playlist} isFavorited={false} isAuthor={playlist.author == this.props.session}/>
        )
    }


}