import React from 'react';
import {Button, Col, Container, Row, FormGroup, Label, Input, ListGroup, ListGroupItem} from "reactstrap";

import OneFilterView from './oneFilterView';
import DatePickerComponent from './datePickerComponent';
import { withTranslation } from 'react-i18next';

class FiltersList extends React.Component {

    applyFilters = () => {
        this.props.applyFilters();
    };

    render() {
        const { t } = this.props;
        return (
            !this.props.filters ? '' :
                <Container fluid style={{ 'marginTop': '1rem' }}>
                    <div style={{ 'position': 'sticky', 'top': '1rem' }}>
                        <Row style={{ 'marginTop': '10px' }}>
                            <Col md={{ size: 12 }}>
                                <div style={{ display: 'flex', flexFlow: 'row' }}>
                                    <Button color="primary" onClick={this.applyFilters}
                                        style={{ flexGrow: 1, textAlign: 'left' }}> {t('Apply')}</Button>
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
                                                    appendSelectedValues={this.props.appendSelectedValues}
                                                    getSearchKey={this.props.getSearchKey}
                                                    filter={filter}
                                                    getSelectedSearchIn={this.props.getSelectedSearchIn}
                                                />
                                            </Col>
                                        </Row>

                                    )
                                }
                            )
                        }
                        <DatePickerComponent dateFilters={this.props.dateFilters} appendDate={this.props.appendDate}></DatePickerComponent>
                    </div>
                </Container>
        );
    }
}

export default withTranslation()(FiltersList);