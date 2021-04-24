import { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';



class CustomNavbar extends Component{

    constructor(props) {

        super(props);   
        console.log(JSON.stringify(props))
        this.state = {
          collapsed: true
        };
      }

     toggleNavbar ()  {
         console.log("came here")
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
   
    
    render(){


      const afterLogin = (

        <div>
          <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">Uber Bus</NavbarBrand>
        <NavbarToggler onClick={() => this.toggleNavbar()} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
        <Nav navbar>
              {this.props.loggedinItems}
            <NavItem>
              <NavLink href="/viewbooking">View Bookings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/user">Book another ride!</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/logout">Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>  </div>
      )


const beforeLogin = (

    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">Uber Bus</NavbarBrand>
        <NavbarToggler onClick={() => this.toggleNavbar()} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav navbar>
              {this.props.loggedinItems}
            <NavItem>
              <NavLink href="/register">Sign Up </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        </Navbar>
    </div>


)

        
        return(
         

<>

{localStorage.isLoggedIn ? afterLogin : beforeLogin}


</>
        )
    }

}

export default CustomNavbar