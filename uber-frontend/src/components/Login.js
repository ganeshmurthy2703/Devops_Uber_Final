import React, { Component } from "react";
import { signIn } from './AccessApiCalls';
import CustomNavbar from "./NavBar";

const validEmailRegex = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

const countErrors = (errors) => {
    let count = 0;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (count = count+1)
    );
    return count;
}

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            errors: {
                email: '',
                password: '',
            }
        };
    }

    componentDidMount() {
        if (localStorage.getItem('isLoggedIn') !== null) {
            this.props.history.push('/user')
            // window.location.reload();
        }
    }

    goToSignUp = e => {
        e.preventDefault()
        this.props.history.push('/sign-up')
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'email': 
            errors.email = 
                validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
            break;
            case 'password': 
            errors.password = 
                value.length < 8
                ? 'Password must be 8 characters long!'
                : '';
            break;
            default:
            break;
        }

        this.setState({errors, [name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({formValid: validateForm(this.state.errors)});
        this.setState({errorCount: countErrors(this.state.errors)});
        const userObj = {
            email: this.state.email,
            password: this.state.password
        }
        signIn(userObj).then(res => {
            if (res.status === 200) {
                let msg = res.data["message"];
                if (msg.includes("Incorrect email address")) {
                    this.setState({
                        errors: {
                            email: msg,
                            password: ''
                        }
                    });
                } else if (msg.includes("Incorrect password")) {
                    this.setState({
                        errors: {
                            email: '',
                            password: msg
                        }
                    });
                } else if(msg.includes("No user found")){
                    alert("No user found. Try signing up.")
                } else {
                    localStorage.setItem('isLoggedIn', res.data["isLoggedIn"])
                    localStorage.setItem('fname', res.data["fname"])
                    localStorage.setItem('lname', res.data["lname"])
                    localStorage.setItem('email', res.data["email"])
                    localStorage.setItem('access_token',res.data["access_token"])
                    localStorage.setItem('refresh_token',res.data["refresh_token"])
                    console.log(localStorage.getItem('email'));
                    this.props.history.push('/user');
                }
            } else {
                alert("Server Error!");
            }
        });
    }


    render() {
        const {errors} = this.state;
        return (
            <>
            
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit} noValidate>
                        <h3>Sign In</h3>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" name='email' className="form-control" placeholder="Enter email" onChange={this.handleChange} noValidate required/>
                            {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name='password' className="form-control" placeholder="Enter password" onChange={this.handleChange} noValidate required/>
                            {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                        </div>
                        <div className='info'>
                            <small>Password must be eight characters in length.</small>
                        </div>
                        <button type="submit" className="btn btn-secondary btn-block">Submit</button>
                    </form>
                </div>
            </div>
            </>
        );
    }
}