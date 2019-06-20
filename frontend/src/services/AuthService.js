import React from 'react';

const AUTH_API_URL = 'http://localhost:8000/auth/login';
const USER_API_URL = 'http://localhost:8000/users';

export default class AuthService {
    static myInstance = null;
    static getInstance() {
        if (AuthService.myInstance == null) {
            AuthService.myInstance = new AuthService();
        }
        return this.myInstance;
    };

    login = (username, password) => fetch(AUTH_API_URL, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials: "same-origin",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json());

    register = (username, password, email) => fetch(USER_API_URL, {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        }),
        credentials: "same-origin",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json());
}