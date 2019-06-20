import React from 'react';

const PLAYLIST_API_URL = 'http://localhost:8000/playlists';

export default class PlaylistService {
    static myInstance = null;

    static getInstance() {
        if (PlaylistService.myInstance == null) {
            PlaylistService.myInstance = new PlaylistService();
        }
        return this.myInstance;
    };

    getRecent = () => {
        return fetch(PLAYLIST_API_URL).then((res) => res.json());
    };

    submitPlaylist = (playlist) => {
        return fetch(PLAYLIST_API_URL,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlist)
        }).then(res => res.json());

    };

}
