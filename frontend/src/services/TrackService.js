import React from 'react';

const TRACK_API_URL = 'http://localhost:8000/songs/lookup'

export default class TrackService {
    static myInstance = null;

    static getInstance() {
        if (TrackService.myInstance == null) {
            TrackService.myInstance = new TrackService();
        }
        return this.myInstance;
    };

    searchTracks = (query) =>
        fetch(TRACK_API_URL + '/' + query)
            .then(response => response.json());

}