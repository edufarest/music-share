import React from 'react';


// Obtained from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
const millisToMinutesAndSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

const PLAYLIST_TRACK_API = "http://localhost:8000/playlists/";

const deleteTrack = (id, playlistId) => {
    fetch(PLAYLIST_TRACK_API + `${playlistId}/${id}`, {
        method: 'DELETE'
    }).then(window.location.reload());
}

const TrackListItem = ({track, playlistId, isAuthor}) =>
    <li className='list-group-item list-group-item-list music-share-track-list-text'>
        <div className='row'>
            <span className='col-3'>{track.name}</span>
            <span className={isAuthor ? 'col-2' : 'col-3'}>{track.artist}</span>
            <span className='col-1'>{millisToMinutesAndSeconds(track.length)}</span>
            <span className='col-1'>{track.tempo}</span>
            <span className='col-2'>{track.loudness} dB</span>
            <span className='col-1'>{track.energy}</span>
            <span className='col-1'>{track.valence}</span>
            {isAuthor && <span className='col-1'><i className='fa-lg fas fa-minus'
                                                    onClick={() => {console.log(track); deleteTrack(track.songId, playlistId)}}></i></span>}
        </div>
    </li>;

export default TrackListItem;