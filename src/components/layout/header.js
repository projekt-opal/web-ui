import React from "react";
import CSS from "./header.css";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

class Header extends React.Component {

    state = {
        isOpen: false
    };

    toggleNavBar = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            // fixed-top
            <Navbar className="navbar navbar-expand-md navbar-dark bg-dark container-fluid">
                <NavbarBrand href="/">
                    <div className={CSS.logo}/>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavBar}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem> <NavLink href="/">Home</NavLink> </NavItem>
                        <NavItem> <NavLink href="/">Report</NavLink> </NavItem>
                        <NavItem> <NavLink href="/">SparQL endpoint</NavLink> </NavItem>
                        <NavItem> <NavLink href="/">About US</NavLink> </NavItem>
                        <NavItem> <NavLink href="/">Contact US</NavLink> </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem> <NavLink href="/">En</NavLink> </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}


export default Header;