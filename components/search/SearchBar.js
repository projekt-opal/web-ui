import React from 'react';

import {connect} from 'react-redux';
import {Button, Form, Collapse, Input, InputGroup, InputGroupAddon, Row, Col, Badge} from 'reactstrap';

import {FaAngleRight} from 'react-icons/fa';

import * as actionCreators from "../../store/actions";

class SearchBar extends React.Component {
    state = {
        collapse: true
    };

    toggleMoreOptions = () => {
        let newState = {...this.state};
        newState.collapse = !newState.collapse;
        this.setState(newState);
    };

    checkFilter = (domain) => {
        this.props.onSearchInChanged(domain);
    };

    removeFilter = (domain) => {
        this.props.onSearchInRemoved(domain);
    };

    searchClicked = () => {
        this.props.onFetchingDataSets(this.props.searchKey, this.props.selectedSearchIn);
        this.props.onGettingNumberOfDataSets(this.props.searchKey, this.props.selectedSearchIn);
    };

    searchKeyChanged = (event) => {
        let searchKey = event.target.value;
        this.props.onSearchKeyChanged(searchKey);
    };

    render() {

        let searchDomainButtons = (
            <>
                {
                    this.props.searchIn.map((domain) => (
                        <Button color="primary" size="sm" key={domain} style={{marginLeft: '5px'}}
                                onClick={() => this.checkFilter(domain)}>
                            {domain} {this.props.selectedSearchIn.includes(domain)  && <Badge> selected </Badge>}
                        </Button>
                    ))
                }

            </>
        );

        let searchDomains = <span style={{marginLeft: '5px', color: 'gray'}}>  Anywhere </span>;
        if (this.props.selectedSearchIn.length > 0)
            searchDomains = (<span style={{marginLeft: '5px', color: 'gray'}}>
                {
                    this.props.selectedSearchIn.map( (domain) => (
                                <span style={{marginLeft: '5px'}} key={domain}>
                                    <Badge onClick={() => this.removeFilter(domain)}> X </Badge>
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
                        <Input placeholder="Search ..." onChange={this.searchKeyChanged} value={this.props.searchKey} />
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

const mapStateToProps = state => {
    return {
        searchKey: state.searchKey.key,
        searchIn: state.searchKey.searchIn,
        selectedSearchIn: state.searchKey.selectedSearchIn
    }
};



const mapDispatchToProps = dispatch => {
    return {
        onFetchingDataSets: (searchKey, searchIn) =>
            dispatch(actionCreators.fetchDataSets(searchKey, searchIn, [])),
        onGettingNumberOfDataSets: (searchKey, searchIn) =>
            dispatch(actionCreators.getNumberOfDataSets(searchKey, searchIn, [])),
        onSearchKeyChanged: (key) => dispatch(actionCreators.searchKeyChanged(key)),
        onSearchInChanged: (idx) => dispatch(actionCreators.searchInChanged(idx)),
        onSearchInRemoved: (idx) => dispatch(actionCreators.searchInRemoved(idx))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);