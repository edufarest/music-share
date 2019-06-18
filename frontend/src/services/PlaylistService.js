import React from 'react';

export default class PlaylistService {
    static myInstance = null;

    static getInstance() {
        if (PlaylistService.myInstance == null) {
            PlaylistService.myInstance = new PlaylistService();
        }
        return this.myInstance;
    };
}
