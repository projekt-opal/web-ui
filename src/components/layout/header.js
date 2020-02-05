import React from "react";
import CSS from "./header.css";
import Link from "next/link";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem,
Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import { withTranslation } from 'react-i18next';

class Header extends React.Component {

    state = {
        isOpen: false,
        dropdownOpen: false,
        lang: "En"
    };

    componentDidMount = () => {
        const { i18n } = this.props;
        this.setState({lang: i18n.language });
    };

    toggleNavBar = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleChangeLang = (e) => {
        this.setState({lang: e.currentTarget.textContent});
        const { i18n } = this.props;
        i18n.changeLanguage(e.currentTarget.textContent);
    }

    toggle = () => {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }

    render() {
        const { t } = this.props;
        return (
            // fixed-top
            <Navbar className="navbar navbar-expand-md navbar-dark bg-dark container-fluid">
                <NavbarBrand href="/">
                    <div className={CSS.logo}/>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavBar}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem> <Link href="/"><a>{t('Home')}</a></Link> </NavItem>
                        <NavItem> <Link href="/catalogs"><a>{t('Catalogs')}</a></Link> </NavItem>
                        <NavItem> <Link href="/publisher"><a>{t('Publisher')}</a></Link> </NavItem>
                        <NavItem> <a href="http://opaldata.cs.uni-paderborn.de:3030/">{t('SparQL endpoint')}</a> </NavItem>
                        <NavItem> <Link href="/about"><a>{t('About US')}</a></Link> </NavItem>
                    </Nav>
                    {/*<Nav className="ml-auto" navbar>*/}
                    {/*    <NavItem> <Link href="/">En</Link> </NavItem>*/}
                    {/*</Nav>*/}
                    <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle nav caret>
                        {this.state.lang}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={this.handleChangeLang}>En</DropdownItem>
                        <DropdownItem onClick={this.handleChangeLang}>De</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                </Collapse>
            </Navbar>
        );
    }
}

export default withTranslation()(Header);