import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { signUp } from "./AccessApiCalls";
import Login from "./Login";
import CustomNavbar from "./NavBar";

const validEmailRegex = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/);
const nameRegex = RegExp(/^\w+([.-]?\w+)+$/);
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

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formValid: false,
            fname: null,
            lname: null,
            email: null,
            password: null,
            repassword: null,
            errors: {
                fname: '',
                lname: '',
                email: '',
                password: '',
                repassword: '',
            }
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'fname': 
            errors.fname = 
                nameRegex.test(value)
                ? ''
                : 'No special characters or numbers allowed';
            break;
            case 'lname': 
            errors.lname = 
                nameRegex.test(value)
                ? ''
                : 'No special characters or numbers allowed';
            break;
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
            case 'repassword': 
            errors.repassword = 
                value !== this.state.password
                ? 'Password does not match!'
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
        const data = { 
            fname: this.state.fname, 
            lname: this.state.lname, 
            email: this.state.email, 
            password: this.state.password 
        };
        console.log('submit');
        console.log(data);
        signUp(data).then(res => {
                console.log(res);
                if (res.status === 200) {
                    if (res.data["message"].includes("User added successfully")) {
                        alert("User Registered Successfully!")
                        this.props.history.push('/login');
                        // window.location.reload();
                    } else {
                        this.setState({
                            errors:{
                                fname: '',
                                lname: '',
                                email: res.data["message"],
                                password: ''
                            }
                        });
                    }
                } else {
                    alert("Server Error!");
                }
            });
    }

    render() {
        const {errors, formValid} = this.state;
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit} noValidate>
                        <h3>Sign Up</h3>
                        <div className="form-group">
                            <label>First name</label>
                            <input type="text" className="form-control" placeholder="First name" name="fname" onChange={this.handleChange} noValidate required/>
                            {errors.fname.length > 0 && <span className='error'>{errors.fname}</span>}
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" className="form-control" placeholder="Last name" name="lname" onChange={this.handleChange} noValidate required/>
                            {errors.lname.length > 0 && <span className='error'>{errors.lname}</span>}
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.handleChange} noValidate required/>
                            {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.handleChange} noValidate required/>
                            {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label>Re-Enter Password</label>
                            <input type="password" className="form-control" placeholder="Re-Enter password" name="repassword" onChange={this.handleChange} noValidate required/>
                            {errors.repassword.length > 0 && <span className='error'>{errors.repassword}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        {this.state.errorCount !== null ? <p className="form-status">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : 'Form not submitted'}
                        <p className="forgot-password text-right">
                            <Link className="nav-link" to={"/login"}>Already registered? Sign in</Link>
                            <Switch>
                                <Route path="/login" component={CustomNavbar} />
                            </Switch>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}