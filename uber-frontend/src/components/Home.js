import { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import CustomNavbar from "./NavBar";


export default class AppHome extends Component{

    render(){
        return(
            <div>
            <h1>Welcome to Uber Bus Booking App</h1>
            <p>To book a ride please sign in!</p>   
            
            </div>
            
        )
    }
}