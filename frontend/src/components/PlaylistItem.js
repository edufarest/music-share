import React from 'react'
import '../styles/PlaylistListItem.css'
import TrackListItem from './TrackListItem'

const PLAYLIST_API = "http://localhost:8000/playlists/";

const PlaylistItem = ({playlist, isAuthor, isFavorited, toggleFavorite}) =>
    <div className='music-share-playlist music-share-text bg-dark'>
        {renderAuthorIcons(isAuthor, playlist)}
        {renderFavorite(playlist, isFavorited, isAuthor, toggleFavorite)}
        <h3 className='mt-2 ml-3'>{playlist.name}</h3>
        <h5 className='mt-2 mb-3 ml-3'> Created by:  {playlist.author}</h5>
        <ul className='mb-3 list-group music-share-track-list overflow-auto'>
            <li className='list-group-item list-group-item-dark sticky-top'>
                <div className='row'>
                    <span className='col-3'>Track Name</span>
                    <span className={isAuthor ? 'col-2' : 'col-3'}>Artist</span>
                    <span className='col-1'>Length</span>
                    <span className='col-1'>Tempo</span>
                    <span className='col-2'>Loudness</span>
                    <span className='col-1'>Energy</span>
                    <span className='col-1'>Valence</span>
                    {isAuthor && <span className='col-1'></span>}
                </div>
            </li>
            {renderTracks(playlist.tracks, playlist.id, isAuthor)}
        </ul>
        {renderStats(playlist)}
    </div>;

const renderTracks = (tracks, playlistId, isAuthor) => {
    console.log("track:");
    console.log(tracks);
    return tracks.map(track => <TrackListItem track={track} playlistId={playlistId} isAuthor={isAuthor}/>);
};

// Obtained from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
const millisToMinutesAndSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

// On true, render a unfavorite icon, on false, render a start, on null, render nothing
const renderFavorite = (playlist, isFavorited, isAuthor, toggleFavorite) => {
    if (!isAuthor) {
        if (isFavorited) {
            return (<i onClick={() => toggleFavorite(playlist)}
                       className='mt-3 mr-3 fa-lg fas fa-minus-circle float-right music-share-icon'/>);
        } else if (isFavorited != null) {
            return (<i onClick={() => toggleFavorite(playlist)}
                       className='mt-3 mr-3 fa-lg fas fa-star float-right music-share-icon'/>);
        }
    }
};

const deletePlaylist = (id) => {

    fetch(PLAYLIST_API + id, {
        method: 'DELETE',
    }).then(window.location.reload())

}

const renderAuthorIcons = (isAuthor, playlist) => {
    if (isAuthor) {
        return (
            <div>
                <i onClick={() => {deletePlaylist(playlist.id)}}
                   className='mt-2 pr-3 fa-2x fas fa-times float-right music-share-icon'/>
                <i onClick={() => console.log('edit')}
                   className='mt-3 px-2 fa-lg fas fa-pencil-alt float-right music-share-icon'/>
            </div>
        );
    }
};

const renderStats = (playlist) => {
    return (
        <h5 className='my-3 pl-3'>
            {playlist.length ? `length: ${millisToMinutesAndSeconds(playlist.length)}  ` : ''}
            {playlist.primaryGenre ? `  primary genre: ${playlist.primaryGenre}  ` : ''}
            {playlist.loudness ? `  loudness: ${playlist.loudness} dB ` : ''}
            {playlist.valence ? `  valence: ${playlist.valence}  ` : ''}
            {playlist.tempo ? `  tempo: ${playlist.tempo}  ` : ''}
            {playlist.energy ? `  energy: ${playlist.energy}  ` : ''}
        </h5>
    )
};

export default PlaylistItem;