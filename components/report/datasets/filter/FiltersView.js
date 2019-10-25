import React from 'react';
import {Button, Col, Container, Row} from "reactstrap";

import FilterView from './fileterView';


class FiltersView extends React.Component {

    addFilter = (event, idx) => {
        console.log("event.target.value: " + event.target.value + ", idx: " + idx);
        // const property = this.props.filters[idx].uri;
        // const uri = event.target.value;
        // this.props.onAppendFilter(property, uri);
    };

    applyFilters = () => {
        this.props.applyFilters();
        // this.props.onToggleFilters(!this.props.isFiltersOpen);
    };



    render() {
        return (
            !this.props.filters ? '' :
            <Container fluid>
                <Row style={{'marginTop': '10px'}}>
                    <Col md={{size: 12}}>
                        <div style={{display: 'flex', flexFlow: 'row'}}>
                            <Button color="primary" onClick={this.applyFilters}
                                    style={{flexGrow: 1, textAlign: 'left'}}> Apply </Button>
                        </div>
                    </Col>
                </Row>
                {
                    this.props.filters.map(
                        (filter, idx) => {
                            const selectedFilterValues = this.props.selectedFilters.filter(x => x.title === filter.title);
                            return (
                                <Row key={idx} style={{'marginTop': '10px'}}>
                                    <Col md={{size: 12}}>
                                        <FilterView
                                            selectedFilterValues={selectedFilterValues.length > 0 ? selectedFilterValues[0].values : []}
                                            onAppendSelectedValues={this.props.onAppendSelectedValues}
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
}

export default FiltersView;