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

    checkFilter = (idx) => {
        this.props.onSearchInChanged(idx);
    };

    removeFilter = (idx) => {
        this.props.onSearchInRemoved(idx);
    };

    searchClicked = () => {
        this.props.onFetchingDataSets(this.props.selectedFilters);
        this.props.onGettingNumberOfDataSets(this.props.selectedFilters);
    };

    searchKeyChanged = (event) => {
        let searchKey = event.target.value;
        this.props.onSearchKeyChanged(searchKey);
    };

    render() {

        let searchFilterButtons = (
            <>
                {
                    this.props.searchIn.map((filter, idx) => (
                        <Button color="primary" size="sm" key={idx} style={{marginLeft: '5px'}}
                                onClick={() => this.checkFilter(idx)}>
                            {filter} {this.props.selectedSearchIn[idx]  && <Badge> selected </Badge>}
                        </Button>
                    ))
                }

            </>
        );

        let searchHint = <span style={{marginLeft: '5px', color: 'gray'}}>  Anywhere </span>;
        if (this.props.selectedSearchIn.indexOf(true) >= 0)
            searchHint = (<span style={{marginLeft: '5px', color: 'gray'}}>
                {this.props.selectedSearchIn.map(
                    (selectedFilter, idx) =>
                        (selectedFilter ?
                            (
                                <span style={{marginLeft: '5px'}} key={idx}>
                                    <Badge onClick={() => this.removeFilter(idx)}> X </Badge>
                                    <span style={{marginLeft: '2px'}}>{this.props.searchIn[idx]}</span>
                                </span>
                            ) : null))}
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
                            {searchFilterButtons}
                        </Collapse>
                        {searchHint}
                    </InputGroup>
                </Form>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedFilters: state.filters.selectedFilters,
        searchKey: state.searchKey.key,
        searchIn: state.searchKey.searchIn,
        selectedSearchIn: state.searchKey.selectedSearchIn
    }
};



const mapDispatchToProps = dispatch => {
    return {
        onFetchingDataSets: (selectedFilters) => dispatch(actionCreators.fetchDataSets(selectedFilters)),
        onGettingNumberOfDataSets: (selectedFilters) => dispatch(actionCreators.getNumberOfDataSets(selectedFilters)),
        onSearchKeyChanged: (key) => dispatch(actionCreators.searchKeyChanged(key)),
        onSearchInChanged: (idx) => dispatch(actionCreators.searchInChanged(idx)),
        onSearchInRemoved: (idx) => dispatch(actionCreators.searchInRemoved(idx))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);