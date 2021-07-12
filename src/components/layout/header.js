import React from "react";
import CSS from "./header.css";
import Link from "next/link";
import {
    Collapse,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    NavbarToggler,
    NavItem
} from "reactstrap";
import { withTranslation } from 'react-i18next';
import axios from '../../../webservice/axios-dataSets';

class Header extends React.Component {

    state = {
        isOpen: false,
        dropdownOpen: false,
        lang: "Deutsch",
        geoUrlPrefix: null,
        geoRedirect: null,
        sparqlEndpoint: null
    };

    componentDidMount = () => {
        const { i18n } = this.props;
        this.setState({ lang: i18n.language });
    };

    toggleNavBar = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    handleChangeLang = (e) => {
        this.setState({ lang: e.currentTarget.textContent });
        const { i18n } = this.props;
        i18n.changeLanguage(e.currentTarget.textContent);
    };

    toggle = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    };

    getGeoUrl = () => {
        if(this.state.geoUrlPrefix == null)
            axios.get("/opalconfig?key=geo.url.prefix")
                .then(response => {
                    if (response.data != null) {
                       this.setState({geoUrlPrefix: response.data})
                    }
                })
                .catch(err => console.log(err));

        if(this.state.geoRedirect == null)
            axios.get("/opalconfig?key=geo.redirect")
                .then(response => {
                    if (response.data != null) {
                       this.setState({geoRedirect: response.data})
                    }
                })
                .catch(err => console.log(err));

        return 'https://projekt-opal.github.io/hackathon/geo/' + '?key=' + 'urlPrefix' + '&value=' + this.state.geoUrlPrefix + '&redirect=' + this.state.geoRedirect;
    };

    getSparqlEndpoint = () => {
        if(this.state.sparqlEndpoint == null)
            axios.get("/opalconfig?key=SPARQL_ENDPOINT_LATEST")
                .then(response => {
                    if (response.data != null) {
                       this.setState({sparqlEndpoint: response.data})
                    }
                })
                .catch(err => console.log(err));

        return this.state.sparqlEndpoint;
    };

    render() {
        const { t } = this.props;
        return (
            // fixed-top
            <Navbar className="navbar navbar-expand-md navbar-dark bg-dark container-fluid">
                <NavbarBrand href="/">
                    <div className={CSS.logo} />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavBar} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem> <NavLink href="/"><a>{t('Home')}</a></NavLink> </NavItem>
                        <NavItem> <NavLink href="/catalogs"><a>{t('Catalogs')}</a></NavLink> </NavItem>
                        <NavItem> <NavLink href="/publisher"><a>{t('Publisher')}</a></NavLink> </NavItem>
                        <NavItem> <NavLink href={this.getGeoUrl()}><a>Geo</a></NavLink> </NavItem>
                        <NavItem> <NavLink href="/about"><a>{t('About US')}</a></NavLink> </NavItem>
                    </Nav>
                    <Nav className="mr-3" navbar>
                        <NavItem> <NavLink href={this.getSparqlEndpoint()} target="_blank">{t('SparQL endpoint')}</NavLink> </NavItem>
                        <NavItem> <NavLink href="https://github.com/projekt-opal/feedback/issues/new?template=feedback.md" target="_blank"><a>{t('feedback')}</a></NavLink> </NavItem>
                    </Nav>
                    {/*<Nav className="ml-auto" navbar>*/}
                    {/*    <NavItem> <Link href="/">En</Link> </NavItem>*/}
                    {/*</Nav>*/}
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>{this.state.lang}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.handleChangeLang}>English</DropdownItem>
                            <DropdownItem onClick={this.handleChangeLang}>Deutsch</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Collapse>
            </Navbar>
        );
    }
}

export default withTranslation()(Header);
