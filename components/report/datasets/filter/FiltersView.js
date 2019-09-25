import React from 'react';
import {Button, Col, Container, Row} from "reactstrap";
import {connect} from 'react-redux';

import FilterView from './fileterView';

import * as actionCreators from '../../../../store/actions/index';



class FiltersView extends React.Component {

    addFilter = (event, idx) => {
        const property = this.props.filters[idx].uri;
        const uri = event.target.value;
        this.props.onAppendFilter(property, uri);
    };

    applyFilters = () => {
        this.props.applyFilters();
    };

    clearSelection = () => {
        this.setState({selectedFilters: []});
    };

    render() {
        let filters = [];
        let titles = {};
        if(this.props.filters.length){
            this.props.filters.forEach(i => {
                titles[i.title] = {};
            });
        } else {
            this.props.headers.forEach(t => {
                filters.push({title: t, values: []});
            });    
        }

        if(this.props.values.length){
            filters = this.props.values;
        } else
        {
            Object.keys(titles).forEach((t,index) => {
                filters.push({title: t, values: []});
                if(this.props.filters.length){
                    this.props.filters.forEach(i => {
                        if(t === i.title){
                            filters[index].values.push(i.value);
                        }
                    })
                }  
            });
        }

        return (
            <Container fluid>
                <Row style={{'marginTop': '10px'}}>
                    <Col md={{size: 12}}>
                        <div style={{display: 'flex', flexFlow: 'row'}}>
                            <Button color="primary" onClick={this.applyFilters}
                                    style={{flexGrow: 1, textAlign: 'left'}}> Apply </Button>
                            <Button color="link" onClick={this.clearSelection}> clear </Button>
                        </div>
                    </Col>
                </Row>
                {
                    filters.map(
                        (filter, idx) => {
                            const selectedFilterValues = this.props.selectedFilters.filter(x => x.property === filter.uri);
                            return (
                                <Row key={idx} style={{'marginTop': '10px'}}>
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

const mapStateToProps = state => {
    return {
        selectedFilters: state.filters.selectedFilters,
        headers: state.filters.headers,
        values: state.filters.values
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAppendFilter: (property, uri) => dispatch(actionCreators.appendSelectedFilter(property, uri)),
        // onApplyFilter:
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersView);