import React from 'react';
import {Redirect} from 'react-router'
import {withRouter} from 'react-router-dom'
import PlaylistItem from './PlaylistItem'
import TrackSearchListItem from './TrackSearchListItem'
import TrackService from '../services/TrackService'
import PlaylistService from '../services/PlaylistService'
import '../styles/CreatePlaylist.css'

class CreatePlaylist extends React.Component {
    constructor(props) {
        super(props);

        this.trackService = TrackService.getInstance();
        this.playlistService = PlaylistService.getInstance();

        this.state = {
            search: [],
            searchInput: '',
            workingPlaylist: {
                name: '',
                author: this.props.user,
                tracks: []
            }
        }
    }

    searchTracks() {
        if (this.state.searchInput == '') {
            return;
        }
        this.trackService.searchTracks(this.state.searchInput).then (
            data => {
                this.setState({search: data.tracks.items});
            }
        )
    }

    renderSearchResults = () => {
        return this.state.search.map(track => <TrackSearchListItem track={track} addTrack={this.addTrack}/>)
    };

    submitPlaylist = () => {
        this.playlistService.submitPlaylist(this.state.workingPlaylist, this.props.user);
        this.props.history.push('/')
    };

    addTrack = (track) => {
        let convertedTrack = {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            length: track.duration_ms,
            genre: 'placeholder genre',
            artistId: track.artists[0] && track.artists[0].id,
            album:  {
                id: track.album.id,
                name: track.album.name,
                releaseDate: track.album.release_date,
                img: track.album.images[0] && track.album.images[0].url
            }

        };

        this.state.workingPlaylist.tracks.push(convertedTrack);

        this.setState({workingPlaylist: this.state.workingPlaylist});
    };

    removeSong = (id) => {

        let filteredTracks = this.state.workingPlaylist.tracks.filter((track) => {
            return track.id != id;
        })

        let workingPlaylist = this.state.workingPlaylist;
        workingPlaylist.tracks = filteredTracks;

        this.setState({workingPlaylist: workingPlaylist});
    }

    render() {
        if (!this.props.user) {
            return (
                <Redirect to='/login'/>
            );
        }

        return(
            <div className='mt-4 container'>
                <h2>Create A Playlist</h2>
                <div>
                    <PlaylistItem playlist={this.state.workingPlaylist} isEditing={true} removeSong={(id)=>{this.removeSong(id)}}/>
                </div>
                <h4 className='mt-3'>Playlist Name</h4>
                <input className='my-3 form-control'
                       placeholder='Enter your playlist name...'
                       value={this.state.workingPlaylist.name}
                       onChange={event => this.setState({
                           workingPlaylist: {...this.state.workingPlaylist, name: event.target.value}
                       })}/>
                <h4>Track Search</h4>
                <div className='mb-4 bg-dark music-share-create-search'>
                    <div className='mt-3 row'>
                        <span className='col-1 ml-5'/>
                        <input className='form-control col-8'
                               placeholder='Search for tracks...'
                               value={this.state.searchInput}
                               onChange={event => this.setState({searchInput: event.target.value})}/>
                        <button className='btn music-share-button col-1'
                                onClick={() => this.searchTracks()}>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <ul class="px-5 my-4 list-group list-group-flush music-share-create-search-results overflow-auto">
                        <li class="list-group-item list-group-item-dark sticky-top">
                            <div className='row'>
                                <span className='col-1'>Cover</span>
                                <span className='col-3'>Track Name</span>
                                <span className='col-3'>Artist</span>
                                <span className='col-2'>Album</span>
                                <span className='col-1'>Length</span>
                                <span className='col-1'>&nbsp;</span>
                            </div>
                        </li>
                        {this.renderSearchResults()}
                    </ul>
                </div>
                <div className='row mb-3'>
                    <span className='col-4'/>
                    <button className='mx-2 btn music-share-button col-2'
                            onClick={() => this.submitPlaylist()}>
                        Submit
                    </button>
                    <button className='mx-2 btn music-share-button col-2'
                            onClick={() => {this.props.history.push("/")}}>
                        Cancel
                    </button>
                    <span className='col-4'/>
                </div>
            </div>
        )
    }
}

export default withRouter(CreatePlaylist);