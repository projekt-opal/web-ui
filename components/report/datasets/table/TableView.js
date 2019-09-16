import React from 'react';
import {Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, Spinner, Table} from "reactstrap";
import {FaRedo, FaThLarge, FaThList} from "react-icons/fa";
import ShortView from "../dataset/ShortView";
import LongView from "../dataset/LongView";
import FiltersView from '../filter/FiltersView';

import {connect} from 'react-redux';
import * as actionCreators from '../../../../store/actions/index';


class TableView extends React.Component {

    state = {
        dropdownOpen: false,

        listOrderByValues: ['title', 'issue date', 'theme'],
        selectedOrder: 0,

        isLongView: true,

        isTooltipNumberOfDataSetsOpen: false,
        isTooltipDataSetsOpen: false
    };

    componentDidMount() {
        this.props.onFetchingDataSets(this.props.searchKey, this.props.selectedSearchIn, this.props.selectedFilters);
        this.props.onGettingNumberOfDataSets(this.props.searchKey, this.props.selectedSearchIn, this.props.selectedFilters);
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
        if(this.props.dataSets !== null && this.props.dataSets.length > 0)
            this.props.onLoad10More(this.props.searchKey, this.props.selectedSearchIn, this.props.dataSets.length, this.props.selectedFilters);
    };

    applyFilters = () => {
        this.props.onFetchingDataSets(this.props.searchKey, this.props.selectedSearchIn, this.props.selectedFilters);
        this.props.onGettingNumberOfDataSets(this.props.searchKey, this.props.selectedSearchIn, this.props.selectedFilters);
    };

    reloadNumberOfDataSets = () => {
        this.setState({
            isTooltipNumberOfDataSetsOpen: false
        });
        this.props.onGettingNumberOfDataSets(this.props.searchKey, this.props.selectedSearchIn, this.props.selectedFilters);

    };

    reloadDataSets = () => {
        this.setState({
            isTooltipDataSetsOpen: false
        });
        this.props.onFetchingDataSets(this.props.searchKey, this.props.selectedSearchIn, this.props.selectedFilters);
    };

    toggleToolTipNumberOfDataSets = () => {
        this.setState({
            isTooltipNumberOfDataSetsOpen: !this.state.isTooltipNumberOfDataSetsOpen
        });
    };

    toggleToolTipDataSets = () => {
        this.setState({
            isTooltipDataSetsOpen: !this.state.isTooltipDataSetsOpen
        });
    };


    render() {
        let numberOfResult = null;
        if (this.props.loadingNumberOfDataSetsError)
            numberOfResult =
                <div>
                    <Button onClick={this.reloadNumberOfDataSets}><FaRedo
                        id="TooltipNumberOfDataSetsFetchError"/></Button>
                    <span style={{marginLeft: '3px', fontSize: '8px', fontWeight: '500'}}>Error in Fetching number of datasets from the server</span>
                </div>;
        else if (this.props.loadingNumberOfDataSets)
            numberOfResult = <Spinner color="primary"/>;
        else if (this.props.numberOfDataSets !== null)
            if (this.props.numberOfDataSets === -1)
                numberOfResult =
                    <div>
                        <Button onClick={this.reloadNumberOfDataSets}><FaRedo
                            id="TooltipNumberOfDataSetsInternalServerError"/></Button>
                        <span
                            style={{marginLeft: '3px', fontSize: '8px', fontWeight: '500'}}>Internal Server Error</span>
                    </div>;
            else
                numberOfResult = this.props.numberOfDataSets;

        let dataSets = null;
        if (this.props.loadingDataSetsError)
            dataSets =
                <div>
                    <Button onClick={this.reloadDataSets}><FaRedo id="ToolTipDataSets"/></Button>
                    <span style={{marginLeft: '3px', fontSize: '8px', fontWeight: '500'}}>Error in Fetching dataSets from the server</span>
                </div>;
        else if (this.props.loadingDataSets)
            dataSets = <Spinner type="grow" color="primary"/>;
        else if (this.props.dataSets !== null)
            dataSets = this.props.dataSets.map(
                dataSet => (
                    <Col md={{size: 12}} key={dataSet.uri}>
                        {this.state.isLongView ? <LongView dataSet={dataSet}/> : <ShortView dataSet={dataSet}/>}
                    </Col>
                )
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
                            <Button className="mx-auto" style={{marginBottom: '1rem'}} onClick={this.load10More} disabled={this.props.dataSets === null} > Load
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
        loadingDataSets: state.ds.loadingDataSets,
        loadingDataSetsError: state.ds.loadingDataSetsError,

        numberOfDataSets: state.ds.numberOfDataSets,
        loadingNumberOfDataSets: state.ds.loadingNumberOfDataSets,
        loadingNumberOfDataSetsError: state.ds.loadingNumberOfDataSetsError,

        filters: state.filters.filters,
        selectedFilters: state.filters.selectedFilters,

        searchKey: state.searchKey.key,
        searchIn: state.searchKey.searchIn,
        selectedSearchIn: state.searchKey.selectedSearchIn
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchingDataSets: (searchKey, searchIn, selectedFilters) =>
            dispatch(actionCreators.fetchDataSets(searchKey, searchIn, selectedFilters)),
        onGettingNumberOfDataSets: (searchKey, searchIn, selectedFilters) =>
            dispatch(actionCreators.getNumberOfDataSets(searchKey, searchIn, selectedFilters)),
        onLoad10More: (searchKey, searchIn, low, selectedFilters) =>
            dispatch(actionCreators.load10More(searchKey, searchIn, low, selectedFilters)),
        onFetchFilters: () => dispatch(actionCreators.fetchFilters())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableView);