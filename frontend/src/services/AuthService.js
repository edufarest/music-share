import React from 'react';

const AUTH_API_URL = 'http://localhost:8000/auth/login';

export default class CourseService {
    static myInstance = null;
    static getInstance() {
        if (CourseService.myInstance == null) {
            CourseService.myInstance = new CourseService();
        }
        return this.myInstance;
    };

    login = (username, password) => fetch(AUTH_API_URL, {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => console.log(response));
}