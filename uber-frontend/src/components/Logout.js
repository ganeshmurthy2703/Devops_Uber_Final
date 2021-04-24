import React, { Component } from 'react';

class Logout extends Component {

    componentDidMount() {
        console.log(localStorage.getItem('isLoggedIn'))
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('email')
        localStorage.removeItem('fname')
        localStorage.removeItem('lname')
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                Logged Out
            </div>
        );
    }
}

export default Logout