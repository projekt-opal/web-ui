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
                        <NavItem> <NavLink href="/catalogs">Catalogs</NavLink> </NavItem>
                        <NavItem> <NavLink href="/publisher">Publisher</NavLink> </NavItem>
                        <NavItem> <NavLink href="http://opaldata.cs.uni-paderborn.de:3030/">SparQL endpoint</NavLink> </NavItem>
                        <NavItem> <NavLink href="/about">About US</NavLink> </NavItem>
                    </Nav>
                    {/*<Nav className="ml-auto" navbar>*/}
                    {/*    <NavItem> <NavLink href="/">En</NavLink> </NavItem>*/}
                    {/*</Nav>*/}
                </Collapse>
            </Navbar>
        );
    }
}


export default Header;