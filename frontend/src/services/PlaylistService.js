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

    submitPlaylist = (playlist, username) => {
        return fetch(PLAYLIST_API_URL + '/' + username, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlist)
        }).then(res => res.json());

    };

    getPlaylistsByUser = (username) => {
        return fetch(PLAYLIST_API_URL + '/' + username).then(res => res.json());
    };

    getFavoritePlaylistsByUser = (username) => {
        return fetch(PLAYLIST_API_URL + '/fav/' + username).then(res => res.json());
    };

    favoritePlaylist = (username, playlistId) => {
        return fetch(PLAYLIST_API_URL + '/fav/' + playlistId + '/' + username, {
            method: "POST"
        }).then(res => res.json);
    };

    deleteFavoritePlaylist = (username, playlistId) => {
        return fetch(PLAYLIST_API_URL + '/fav/' + playlistId + '/' + username, {
            method: "DELETE"
        }).then(res => res.json);
    }

}
