import React from 'react';
import {Button, Form, Collapse, Input, InputGroup, InputGroupAddon, Row, Col, Badge} from 'reactstrap';
import {faCheck, faWindowClose, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class SearchBar extends React.Component {
    state = {
        collapse: true,
        filters: ['title', 'description', 'keyword'],
        selectedFilters: [false, false, false]
    };

    toggleMoreOptions = () => {
        let newState = {...this.state};
        newState.collapse = !newState.collapse;
        this.setState(newState);
    };

    checkFilter = (idx) => {
        console.debug("selected index to toggle filter is: " + idx);
        let newState = {...this.state};
        newState.selectedFilters[idx] = !newState.selectedFilters[idx];
        this.setState(newState);
    };

    removeFilter = (idx) => {
        console.debug("selected index to be removed is: " + idx);
        let newState = {...this.state};
        newState.selectedFilters[idx] = false;
        this.setState(newState);
    };

    render() {

        let searchFilterButtons = (
            <>
                {
                    this.state.filters.map((filter, idx) => (
                        <Button color="primary" size="sm" key={idx} style={{marginLeft: '5px'}} onClick={() => this.checkFilter(idx)}>
                            {filter} {this.state.selectedFilters[idx] && <Badge> selected </Badge>}
                        </Button>
                    ))
                }

            </>
        );

        let searchHint = <span style={{marginLeft: '5px', color: 'gray'}}>  Anywhere </span>;
        if(this.state.selectedFilters.indexOf(true) >= 0)
            searchHint = (<span style={{marginLeft: '5px', color: 'gray'}}>
                {this.state.selectedFilters.map(
                    (selectedFilter, idx) =>
                        ( selectedFilter ?
                            (
                                <span style={{marginLeft:'5px'}} key={idx}>
                                    <Badge onClick={() => this.removeFilter(idx)}> X </Badge>
                                    <span style={{marginLeft:'2px'}} >{this.state.filters[idx]}</span>
                                </span>
                            ): null))}
            </span>);

        return (

            <Col md={{size:12}}><Form>
                <InputGroup size="lg">
                    <Input placeholder="Search ..."/>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupAddon addonType="prepend">
                            <Button>Search</Button>
                        </InputGroupAddon>
                    </InputGroupAddon>
                </InputGroup>
                <InputGroup style={{marginTop: '5px'}}>
                    <Button color="link" size="sm" onClick={this.toggleMoreOptions}>
                        <span>Search in : </span>
                        <FontAwesomeIcon icon={faCaretRight}/>
                    </Button>
                    <Collapse isOpen={!this.state.collapse}>
                        {searchFilterButtons}
                    </Collapse>
                    {searchHint}
                </InputGroup>
            </Form></Col>
        );
    }
}

export default SearchBar;