import React from 'react';
import {Button, Col, Container, Row} from "reactstrap";

import OneFilterView from './fileterView';

class FiltersList extends React.Component {

    applyFilters = () => {
        this.props.applyFilters();
    };

    render() {
        return (
            !this.props.filters ? '' :
                <Container fluid style={{ 'marginTop': '1rem' }}>
                    <div style={{ 'position': 'sticky', 'top': '1rem' }}>
                        <Row style={{ 'marginTop': '10px' }}>
                            <Col md={{ size: 12 }}>
                                <div style={{ display: 'flex', flexFlow: 'row' }}>
                                    <Button color="primary" onClick={this.applyFilters}
                                        style={{ flexGrow: 1, textAlign: 'left' }}> Apply </Button>
                                </div>
                            </Col>
                        </Row>
                        {
                            this.props.filters.map(
                                (filter, idx) => {
                                    const selectedFilterValues = this.props.selectedFilters.filter(x => x.title === filter.title);
                                    return (
                                        <Row key={idx} style={{ 'marginTop': '10px' }}>
                                            <Col md={{ size: 12 }}>
                                                <OneFilterView
                                                    selectedFilterValues={selectedFilterValues.length > 0 ? selectedFilterValues[0].values : []}
                                                    onAppendSelectedValues={this.props.onAppendSelectedValues}
                                                    onGetSearchKey={this.props.onGetSearchKey}
                                                    filter={filter}
                                                    getSelectedSearchIn={this.props.getSelectedSearchIn}
                                                />
                                            </Col>
                                        </Row>

                                    )
                                }
                            )
                        }
                    </div>
                </Container>
        );
    }
}

export default FiltersList;