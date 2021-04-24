import React, { Component } from "react";
import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { addbooking, getoperator } from "./BookingApiCalls";
import CustomNavbar from "./NavBar";
var currDate = '';
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: 'Select Source',
            destination: 'Select Destination',
            operator: '',
            operatorsList: [],
            date: currDate,
            enable: true,
            success: '',
            errors: {
                source: '',
                destination: '',
                operator: '',
                date: '',
                submit: ''
            }
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.getOperator = this.getOperator.bind(this);
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleDestinationChange = this.handleDestinationChange.bind(this);
        this.handleOperatorChange = this.handleOperatorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSourceChange(event) {
        this.setState({
            source: event.target.value,
            destination: 'Select Destination',
            date: currDate,
            operator: '',
            errors: {
                source: '',
                destination: '',
                submit: ''
            }
        });
    }

    handleDateChange(value) {
        if (this.state.source === 'Select Source') {
            this.setState({
                errors: {
                    source: 'Source cannot be empty',
                    destination: ''
                }
            });
        }
        else if (this.state.destination === 'Select Destination') {
            this.setState({
                errors: {
                    source: '',
                    destination: 'Destionation cannot be empty'
                }
            });
        } else {
            console.log("Vallllllllue");
            console.log(value);
            this.setState({
                date: new Date(value),
                operatorsList: [],
                operator: '',
                errors: {
                    source: '',
                    destination: ''
                }
            });
            console.log("Check")
            console.log(this.state.date);
        }
    }

    getOperator(event) {
        event.preventDefault();
        console.log("Get Operator")
        console.log(this.state.date)
        const booking = {
            source: this.state.source,
            destination: this.state.destination,
            date: this.state.date
        }
        getoperator(booking).then(res => {
            if (res.status === 200) {
                if (res.data["message"] === "No operators has seats available" || res.data["message"] === "No operators found") {
                    console.log("Operator data1")
                    console.log(res.data);
                    this.setState({
                        operatorsList: [],
                        enable: true,
                        errors: {
                            source: '',
                            destination: '',
                            operator: 'No operators has seats available. Select another date.',
                            submit: ''
                        }
                    });
                } else {
                    console.log("Operator data2")
                    console.log(res.data);
                    let size = Object.keys(res.data).length
                    console.log(size);
                    if (size < 1) {
                        this.setState({
                            operatorsList: [],
                            enable: true,
                            errors: {
                                operator: 'No operator found',
                                submit: ''
                            }
                        });
                    } else {
                        this.setState({
                            enable: false
                        });
                        this.setState({
                            operatorsList: res.data,
                            operator: res.data[0]["name"],
                            errors: {
                                source: '',
                                destination: '',
                                operator: ''
                            }
                        });
                    }
                }
            }
        })
    }

    handleDestinationChange(event) {
        if (this.state.source === 'Select Source') {
            this.setState({
                errors: {
                    source: 'Source cannot be empty',
                    destination: ''
                }
            });
        }
        else if (this.state.source === event.target.value) {
            this.setState({
                errors: {
                    source: '',
                    destination: 'Destination cannot be same as source'
                }
            });
        } else {
            this.setState({
                destination: event.target.value,
                date: currDate,
                operator: '',
                errors: {
                    source: '',
                    destination: ''
                }
            });
        }
    }

    handleOperatorChange(event) {
        console.log(event.target.key)
        this.setState({ operator: event.target.value });
        console.log("Operator Change:", this.state.operator);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(currDate);
        console.log(this.state.date);
        console.log(this.state.operator);

        const defaultBooking = {
            source: 'Select Source',
            destination: 'Select Destination',
            date: '',
            operator: ''
        };
        if (this.state.source === defaultBooking.source || this.state.destination === defaultBooking.destination || this.state.date === defaultBooking.date || this.state.operator === defaultBooking.operator) {
            this.setState({
                errors: {
                    submit: 'Select all the required fields'
                }
            })
        }

        else {
            const booking = {
                email: localStorage.getItem('email'),
                source: this.state.source,
                destination: this.state.destination,
                date: this.state.date,
                operator: this.state.operator
            };
            console.log(booking);
            addbooking(booking).then(res => {
                if (res.status === 200) {
                    if (res.data["message"] === "Operator not available") {
                        this.setState({
                            error: {
                                source: "",
                                destination: "",
                                operator: res.data["message"],
                                operatorsList: [],
                                submit: res.data["message"]
                            }
                        });
                    } else {
                        let size = Object.keys(res.data).length
                        console.log(size);
                        if (size < 1) {
                            this.setState({
                                error: {
                                    source: "",
                                    destination: "",
                                    operator: '',
                                    operatorsList: [],
                                    submit: 'No buses found'
                                }
                            });
                        } 
                        this.setState({
                            source: 'Select Source',
                            destination: 'Select Destination',
                            operator: '',
                            operatorsList: [],
                            date: currDate,
                            enable: true
                        });
                        setTimeout(() => this.setState({ success: 'Booking done successfully' }), 1000);
                    }
                }
            })
        }
    }

    render() {
        return (
            <>
               
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={this.handleSubmit}>
                            <h3>Bus Ticket Booking</h3>
                            <div className="form-group">
                                <select className="custom-select" value={this.state.source} onChange={this.handleSourceChange} required>
                                    <option value="destination">Select Source</option>
                                    <option value="Boston">Boston</option>
                                    <option value="New York">New York</option>
                                    <option value="Pittsburgh">Pittsburgh</option>
                                </select>
                                {this.state.errors.source !== '' && <span className='error'>{this.state.errors.source}</span>}
                            </div>

                            <div className="form-group">
                                <select className="custom-select" value={this.state.destination} onChange={this.handleDestinationChange} required>
                                    <option value="destination">Select Destination</option>
                                    <option value="Boston">Boston</option>
                                    <option value="New York">New York</option>
                                    <option value="Pittsburgh">Pittsburgh</option>
                                </select>
                                {this.state.errors.destination !== '' && <span className='error'>{this.state.errors.destination}</span>}
                            </div>

                            <div className="form-group">
                                <DatePicker className="custom-select" value={this.state.date} selected={this.state.date} onChange={this.handleDateChange} minDate={moment().toDate()} required />
                                {this.state.errors.date !== '' && <span className='error'>{this.state.errors.date}</span>}
                                <button onClick={this.getOperator} className="btn btn-secondary btn-block">Get Operators</button>
                                <select id="operator" className="custom-select" value={this.state.operator} onChange={this.handleOperatorChange} disabled={this.state.enable} required>
                                    {Object.keys(this.state.operatorsList).map((operator, index) => (
                                        this.state.operatorsList[index]["quantity"] >= 1 ? <option key={index} value={this.state.operatorsList[index]["name"]} >{this.state.operatorsList[index]["name"]}</option> : null
                                    ))}
                                </select>
                                {this.state.errors.operator !== '' && <span className='error'>{this.state.errors.operator}</span>}
                            </div>
                            <button type="submit" className="btn btn-secondary btn-block" value="Submit">Book</button>
                            {this.state.errors.submit !== '' && <span className='error'>{this.state.errors.submit}</span>}
                            {this.state.success !== '' && <span className='success'>{this.state.success}</span>}
                        </form>
                    </div>
                </div>
            </>
        );
    }
}
