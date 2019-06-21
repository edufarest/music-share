import React from 'react'
import '../styles/PlaylistListItem.css'
import TrackListItem from './TrackListItem'

const PlaylistItem = ({playlist, isAuthor, isFavorited, toggleFavorite}) =>
    <div className='music-share-playlist music-share-text bg-dark'>
        {renderAuthorIcons(isAuthor)}
        {renderFavorite(playlist, isFavorited, isAuthor, toggleFavorite)}
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
        {renderStats(playlist)}
    </div>;

const renderTracks = tracks => {
    return tracks.map(track => <TrackListItem track={track}/>);
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

const renderAuthorIcons = isAuthor => {
    if (isAuthor) {
        return (
            <div>
                <i onClick={() => console.log('delete')}
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
            {playlist.loudness ? `  loudness: ${playlist.loudness}  ` : ''}
            {playlist.happiness ? `  happiness: ${playlist.happiness}  ` : ''}
            {playlist.danceability ? `  danceability: ${playlist.danceability}  ` : ''}
        </h5>
    )
};

export default PlaylistItem;