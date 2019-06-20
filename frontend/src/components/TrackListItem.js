import React from 'react';


// Obtained from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
const millisToMinutesAndSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

// TODO: Add an edit mode here to enable removing tracks - add mode and delete mode
const TrackListItem = ({track}) =>
    <li className='list-group-item list-group-item-list music-share-track-list-text'>
        <div className='row'>
            <span className='col-4'>{track.name}</span>
            <span className='col-3'>{track.artist}</span>
            <span className='col-2'>{millisToMinutesAndSeconds(track.length)}</span>
            <span className='col-3'>{track.genre}</span>
        </div>
    </li>;

export default TrackListItem;