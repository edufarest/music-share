import React from 'react';

const TrackListItem = ({track}) =>
    <li className='list-group-item list-group-item-list music-share-track-list-text'>
        <div className='row'>
            <span className='col-4'>{track.name}</span>
            <span className='col-3'>{track.artist}</span>
            <span className='col-2'>{track.length}</span>
            <span className='col-3'>{track.genre}</span>
        </div>
    </li>;

export default TrackListItem;