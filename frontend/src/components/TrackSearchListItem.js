import React from 'react';

const TrackSearchListItem = ({track}) =>{
    console.log(track);
    return(
        <li className='list-group-item list-group-item-list music-share-track-list-text'>
            <div className='row'>
                <img src={track.album.images[1].url} className='col-2 music-share-search-result-img'/>
                <span className='col-3'>{track.name}</span>
                <span className='col-3'>{track.artists[0].name}</span>
                <span className='col-2'>{millisToMinutesAndSeconds(track.duration_ms)}</span>
                <span className='col-2'>{track.genre}</span>
            </div>
        </li>
    );
};

// Obtained from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

export default TrackSearchListItem;