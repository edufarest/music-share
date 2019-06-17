import React from 'react'
import '../styles/PlaylistListItem.css'
import TrackListItem from './TrackListItem'

const PlaylistListItem = ({playlist}) =>
    <div className='music-share-playlist music-share-text bg-dark'>
        <h3 className='mt-2 ml-3'>{playlist.name}</h3>
        <h5 className='mt-2 mb-3 ml-3'> Created by:  {playlist.author}</h5>
        <ul className='mb-3 list-group music-share-track-list overflow-auto'>
            <li className='list-group-item list-group-item-dark sticky-top'>
                <div className='row'>
                    <span className='col-4'>Track Name</span>
                    <span className='col-3'>Artist</span>
                    <span className='col-2'>Length</span>
                    <span className='col-3'>Genre</span>
                </div>
            </li>
            {renderTracks(playlist.tracks)}
        </ul>
    </div>;


const renderTracks = tracks => {
    return tracks.map(track => <TrackListItem track={track}/>);
};

export default PlaylistListItem;