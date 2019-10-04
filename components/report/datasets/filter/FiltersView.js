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
        this.props.onToggleFilters(!this.props.isFiltersOpen);
    };

    clearSelection = () => {
        this.setState({selectedFilters: []});
    };

    render() {
        let filters = [];
        let titles = {};
        if(this.props.filters && this.props.filters.length){
            this.props.filters.forEach(i => {
                titles[i.title] = {};
            });
        } else if(this.props.titles){
            this.props.titles.forEach(t => {
                filters.push({title: t, values: []});
            });    
        }

        if(this.props.values && this.props.values.length){
            filters = this.props.values;
        }
        
        if(Object.keys(titles).length){
            filters = [];
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
        titles: state.filters.titles,
        values: state.filters.values,
        filters: state.filters.filters,
        isFiltersOpen: state.filters.isFiltersOpen
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAppendFilter: (property, uri) => dispatch(actionCreators.appendSelectedFilter(property, uri)),
        // onApplyFilter:
        onToggleFilters: (isFiltersOpen) => dispatch(actionCreators.toggleFilters(isFiltersOpen)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersView);