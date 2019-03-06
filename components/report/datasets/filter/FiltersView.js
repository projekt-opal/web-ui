import React from 'react';
import {Button, Col, Container, Row} from "reactstrap";

import FilterView from './fileterView';

class FiltersView extends React.Component {

    state = {
        selectedFilters: []
    };

    applyFilters = () => {
        console.log(this.state.selectedFilters)
    };

    addFilter = (event, idx) => {
        let selectedFilters = [...this.state.selectedFilters];
        let item = {
            property: this.props.filters[idx].uri,
            value: event.target.value
        };
        const i = selectedFilters.findIndex((x) => {
            return x.property === item.property
        });
        console.log(i);
        if(i >= 0) {//if it is already there must add/remove it to values
            const filterIndex = i;
            console.log("filterIndex: " + filterIndex);
            console.log(selectedFilters[filterIndex]);
            const j = selectedFilters[filterIndex].values.findIndex((x) => {
                return (x === item.value)
            });
            console.log("j: " + j);
            if(j >= 0)//remove
                selectedFilters[filterIndex].values.splice(j);
            else//add
                selectedFilters[filterIndex].values.push(item.value);
        }
        else {
            console.log("sth");
            selectedFilters.push({property: item.property, values: [item.value]});
        }
        this.setState({selectedFilters: selectedFilters});
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Button color="primary" onClick={this.applyFilters}> Apply </Button>
                    <Button color="link"> clear </Button>
                </Row>
                {
                    this.props.filters.map(
                        (filter, idx) =>
                            <Row key={idx}>
                                <Col md={{size: 12}}>
                                    <FilterView checked={(event) => this.addFilter(event, idx)} filter={filter}/>
                                </Col>
                            </Row>
                    )
                }
            </Container>
        );
    }
};

export default FiltersView;