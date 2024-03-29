import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class Navigation extends React.Component {

    render() {
        return (
            <div className="container">
                <IndexLink to="/" className="logo" activeClassName="selected">Home</IndexLink>
                <Link to="/about" activeClassName="selected">About</Link>
            </div>
        );
    }

}
