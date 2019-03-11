import React from 'react';
import {Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, Spinner, Table} from "reactstrap";
import {FaThLarge, FaThList} from "react-icons/fa";
import ShortView from "../dataset/ShortView";
import LongView from "../dataset/LongView";
import FiltersView from '../filter/FiltersView';

import {connect} from 'react-redux';

import Axios from '../../../../webservice/axios-dataSets';
import * as actionCreators from '../../../../store/actions/index';


class TableView extends React.Component {

    state = {
        dropdownOpen: false,
        listOrderByValues: ['title', 'issue date', 'theme'],
        selectedOrder: 0,

        isLongView: true,
    };

    componentDidMount() {
        this.props.onFetchingDataSets();
        this.props.onGettingNumberOfDataSets();
        this.props.onFetchFilters();
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    orderByChanged = (idx) => {
        let newState = {...this.state};
        newState.selectedOrder = idx;
        this.setState(newState);
    };

    largeViewChanged = () => {
        let newState = {...this.state};
        newState.isLongView = !newState.isLongView;
        this.setState(newState);
    };

    load10More = () => {
        this.props.onLoad10More(this.props.dataSets.length);
    };

    applyFilters = (selectedFilters) => {
        console.log(selectedFilters);
        Axios.post("/dataSets/getSubList?", selectedFilters)
            .then( (response) => {
                console.log(response);
                const dataSets = response.data;
                this.setState({dataSets: dataSets});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {

        let numberOfResult = <Spinner color="primary"/>;
        if (this.props.numberOfDataSets)
            numberOfResult = this.props.numberOfDataSets;

        let dataSets = <Spinner type="grow" color="primary"/>;
        if (this.props.dataSets)
            dataSets = this.props.dataSets.map(
                dataSet => (<Col md={{size: 12}} key={dataSet.uri}>
                    {this.state.isLongView ? <LongView dataSet={dataSet}/> : <ShortView dataSet={dataSet}/>}
                </Col>)
            );

        let filterView = this.props.filters ?
            <FiltersView filters={this.props.filters} applyFilters={this.applyFilters}/> : <Spinner color="primary"/>;


        return (
            <Col md={{size: 12}}>
                <Row>
                    <Col md={{size: 10}}>
                        <Table hover bordered responsive striped>
                            <thead>
                            <tr>
                                <th>
                                    <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                                        <span> {numberOfResult} </span>
                                        <div style={{flexGrow: 1}}/>
                                        <Button style={{marginLeft: '2px'}}> Export</Button>
                                        <Button style={{marginLeft: '2px'}} onClick={this.largeViewChanged}>
                                            {this.state.isLongView ? <FaThLarge/> : <FaThList/>}
                                        </Button>
                                        <ButtonDropdown style={{marginLeft: '2px'}} isOpen={this.state.dropdownOpen}
                                                        toggle={this.toggle}>
                                            <DropdownToggle caret>
                                                {this.state.listOrderByValues[this.state.selectedOrder]}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {
                                                    this.state.listOrderByValues.map((orderBy, idx) => {
                                                        return <DropdownItem onClick={() => this.orderByChanged(idx)}
                                                                             active={idx === this.state.selectedOrder}
                                                                             key={idx}>{orderBy}</DropdownItem>
                                                    })
                                                }
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </div>

                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    {dataSets}
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Row>
                            <Button className="mx-auto" style={{marginBottom: '1rem'}} onClick={this.load10More}> Load
                                10 more </Button>
                        </Row>
                    </Col>
                    <Col md={{size: 2}}>
                        {filterView}
                    </Col>
                </Row>

            </Col>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataSets: state.ds.dataSets,
        loadingDataSets: state.ds.loadingDataSets ,
        loadingDataSetsError : state.ds.loadingDataSetsError,

        numberOfDataSets: state.ds.numberOfDataSets,
        loadingNumberOfDataSets: state.ds.loadingNumberOfDataSets ,
        loadingNumberOfDataSetsError : state.ds.loadingNumberOfDataSetsError,

        filters: state.filters.filters
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchingDataSets: () => dispatch(actionCreators.fetchDataSets()),
        onGettingNumberOfDataSets: () => dispatch(actionCreators.getNumberOfDataSets()),
        onLoad10More: (low) => dispatch(actionCreators.load10More(low)),
        onFetchFilters: () => dispatch(actionCreators.fetchFilters())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableView);