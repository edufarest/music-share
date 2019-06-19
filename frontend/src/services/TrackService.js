import React from 'react';

const TRACK_API_URL = 'http://localhost:8000/songs';
const ARTIST_API_URL = 'http://localhost:8000/artists';
const ALBUM_API_URL = 'http://localhost:8000/albums';

export default class TrackService {
    static myInstance = null;

    static getInstance() {
        if (TrackService.myInstance == null) {
            TrackService.myInstance = new TrackService();
        }
        return this.myInstance;
    };

    searchTracks = (query) =>
        fetch(TRACK_API_URL + '/lookup/' + query)
            .then(response => response.json());

    createTrack = (track) => {
        let backendTrack = {
            id: track.id,
            title: track.name,
            length: track.duration_ms,
            tempo: 120,
            energy: .50,
            valence: .50,
            release_date: track.release_date,
            albumId: 2,
            artistId: 2,
            genres: ['placeholder genre'],
        };

        return fetch(ARTIST_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: track.artists[0].name,
                id: track.artists[0].id
            })
        }).then(() => fetch(ALBUM_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: track.album.name,
                id: track.album.id,
                authorId: track.artists[0].name,
                releaseDate: track.release_date,
                genres: ['placeholder genre']
            })
        })).then(() => fetch(TRACK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(backendTrack)
        })).then(response => response.json());
    }
}