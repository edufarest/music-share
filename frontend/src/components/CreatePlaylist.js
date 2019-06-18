import React from 'react';
import {Redirect} from 'react-router'
import {withRouter} from 'react-router-dom'
import PlaylistListItem from './PlaylistListItem'
import '../styles/CreatePlaylist.css'

class CreatePlaylist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: [],
            searchInput: '',
            workingPlaylist: {
                name: '',
                author: this.props.session,
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
                    }
                ]
            }
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
                <h2>Create A Playlist</h2>
                <div>
                    <PlaylistListItem playlist={this.state.workingPlaylist}/>
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
                                onClick={() => console.log(this.state.searchInput)}>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <ul class="px-5 my-4 list-group list-group-flush overflow-auto">
                        <li class="list-group-item">
                            <div className='row'>
                                <span className='col-4'>Track Name</span>
                                <span className='col-3'>Artist</span>
                                <span className='col-2'>Length</span>
                                <span className='col-2'>Genre</span>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className='row'>
                                <span className='col-4'>This is a song</span>
                                <span className='col-3'>By an artist</span>
                                <span className='col-2'>6:30</span>
                                <span className='col-2'>heavy metal</span>
                                <i className="mt-1 col-1 fas fa-lg fa-plus music-share-icon-alt float-right"/>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='row mb-3'>
                    <span className='col-4'/>
                    <button className='mx-2 btn music-share-button col-2'
                            onClick={() => console.log(this.state.searchInput)}>
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