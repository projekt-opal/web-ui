import React from 'react';
import {Button, Col, Container, Row} from "reactstrap";

import FilterView from './fileterView';

class FiltersView extends React.Component {

    state = {
        selectedFilters: []
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
        if (i >= 0) {//if it is already there must add/remove it to values
            const filterIndex = i;
            const j = selectedFilters[filterIndex].values.findIndex((x) => {
                return (x === item.value)
            });
            if (j >= 0) {//remove
                selectedFilters[filterIndex].values.splice(j, 1);
            } else//add
                selectedFilters[filterIndex].values.push(item.value);
        } else {
            selectedFilters.push({property: item.property, values: [item.value]});
        }
        this.setState({selectedFilters: selectedFilters});
    };

    applyFilters = () => {
        console.log(this.state.selectedFilters)
    };

    clearSelection = () => {
        this.setState({selectedFilters: []});
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Button color="primary" onClick={this.applyFilters}> Apply </Button>
                    <Button color="link" onClick={this.clearSelection}> clear </Button>
                </Row>
                {
                    this.props.filters.map(
                        (filter, idx) => {
                            const selectedFilterValues = this.state.selectedFilters.filter(x => x.property === filter.uri);
                            return (
                                <Row key={idx}>
                                    <Col md={{size: 12}}>
                                        <FilterView
                                            selectedValues={selectedFilterValues.length > 0 ? selectedFilterValues[0].values : []}
                                            checked={(event) => this.addFilter(event, idx)}
                                            filter={filter}
                                        />
                                    </Col>
                                </Row>
                            )
                        }
                    )
                }
            </Container>
        );
    }
};

export default FiltersView;