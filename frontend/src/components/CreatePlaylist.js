import React from 'react';
import {Redirect} from 'react-router'

export default class CreatePlaylist extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.session) {
            return (
                <Redirect to='/login'/>
            );
        }

        return(
            <h1>CreatePlaylist</h1>
        )
    }
}