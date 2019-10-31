import React from 'react';
import {Badge, Button, Col, Collapse, Form, Input, InputGroup, InputGroupAddon} from 'reactstrap';

import {FaAngleRight} from 'react-icons/fa';

class SearchBar extends React.Component {
    state = {
        collapse: true,
        searchIn: ['title', 'description', 'keyword']
    };

    toggleMoreOptions = () => {
        const collapse = !this.state.collapse;
        this.setState({collapse: collapse});
    };

    checkDomain = (domain) => {
        this.props.onSearchInChanged(domain);
    };

    removeDomain = (domain) => {
        this.props.onUpdatedSearchInRemoved(domain);
    };

    searchClicked = () => {
        this.props.setLastSelectedSearchIn();
        this.props.onFetchingDataSets();
        this.props.onGettingNumberOfDataSets();
    };

    searchKeyChanged = (event) => {
        let searchKey = event.target.value;
        this.props.onUpdateSearchKey(searchKey);
    };

    render() {
        let searchDomainButtons = (
            <>
                {
                    this.state.searchIn.map((domain) => (
                        <Button color="primary" size="sm" key={domain} style={{marginLeft: '5px'}}
                                onClick={() => this.checkDomain(domain)}>
                            {domain} {this.props.selectedSearchIn.includes(domain) && <Badge> selected </Badge>}
                        </Button>
                    ))
                }

            </>
        );

        let searchDomains = <span style={{marginLeft: '5px', color: 'gray'}}>  Anywhere </span>;
        if (this.props.selectedSearchIn.length > 0)
            searchDomains = (<span style={{marginLeft: '5px', color: 'gray'}}>
                {
                    this.props.selectedSearchIn.map((domain) => (
                            <span style={{marginLeft: '5px'}} key={domain}>
                                    <Badge onClick={() => this.removeDomain(domain)}> X </Badge>
                                    <span style={{marginLeft: '2px'}}>{domain}</span>
                                </span>
                        )
                    )
                }
            </span>);

        return (
            <Col md={{size: 12}}>
                <Form>
                    <InputGroup size="lg">
                        <Input placeholder="Search ..." onChange={this.searchKeyChanged}
                               value={this.props.searchKey}/>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupAddon addonType="prepend">
                                <Button onClick={this.searchClicked}>Search</Button>
                            </InputGroupAddon>
                        </InputGroupAddon>
                    </InputGroup>
                    <InputGroup style={{marginTop: '5px'}}>
                        <Button color="link" size="sm" onClick={this.toggleMoreOptions}>
                            <span>Search in : </span>
                            <FaAngleRight/>
                        </Button>
                        <Collapse isOpen={!this.state.collapse}>
                            {searchDomainButtons}
                        </Collapse>
                        {searchDomains}
                    </InputGroup>
                </Form>
            </Col>
        );
    }
}

export default SearchBar;