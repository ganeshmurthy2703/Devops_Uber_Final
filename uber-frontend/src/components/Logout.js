import React, { Component } from 'react';

class Logout extends Component {

    componentDidMount() {
        console.log(localStorage.getItem('isLoggedIn'))
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('email')
        localStorage.removeItem('fname')
        localStorage.removeItem('lname')
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