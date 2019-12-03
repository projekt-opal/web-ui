import React from 'react';
import {Button, Col, Row, Spinner, Table} from "reactstrap";
import {FaRedo, FaThLarge, FaThList} from "react-icons/fa";
import ShortView from "../dataset/ShortView";
import LongView from "../dataset/LongView";
import FiltersView from '../filter/FiltersView';
import OrderBy from "../dataset/OrderBy";

class TableView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLongView: true,

            isTooltipNumberOfDataSetsOpen: false,
            isTooltipDataSetsOpen: false,

            screenWidth: 0,

            isFiltersOpen: false,
            lastSelectedValues: []
        }

    }
    componentDidMount = () => {
        this.props.fetchDataSets();
        this.props.getNumberOfDataSets();
        this.props.onFetchFilters();
        this.handleWindowSizeChange();
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    orderByChanged = (orderByValue, idx) => {
        console.log("Order by value from Table View(child): " + orderByValue);
        this.setState({
            selectedOrder: idx,
            selectedOrderMobile: idx
        })
        this.props.callBackForOrderByValue(orderByValue)

    };

    largeViewChanged = () => {
        let newState = { ...this.state };
        newState.isLongView = !newState.isLongView;
        this.setState(newState);
    };

    applyFilters = () => {
        this.setState({ lastSelectedValues: this.props.selectedFilters });
        this.props.fetchDataSets();
        this.props.getNumberOfDataSets();
    };

    reloadFilters = () => {
        this.props.onFetchFilters();
    };

    reloadNumberOfDataSets = () => {
        console.log("reloading..")
        this.setState({
            isTooltipNumberOfDataSetsOpen: false
        });
        this.props.getNumberOfDataSets();
    };

    reloadDataSets = () => {
        this.setState({
            isTooltipDataSetsOpen: false
        });
        this.props.fetchDataSets();
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

    toggleFilters = () => {
        if (this.state.isFiltersOpen) {
            this.props.onReplaceSelectedFilters(this.state.lastSelectedValues);
        }
        this.setState({ isFiltersOpen: !this.state.isFiltersOpen });
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ screenWidth: window.innerWidth });

    };

    render() {
        let numberOfResult = null;
        if (this.props.loadingNumberOfDataSetsError)
            numberOfResult =
                <div>
                    <Button onClick={this.reloadNumberOfDataSets}><FaRedo
                        id="TooltipNumberOfDataSetsFetchError" /></Button>
                    <span style={{ marginLeft: '3px', fontSize: '8px', fontWeight: '500' }}>Error in Fetching number of datasets from the server</span>
                </div>;
        else if (this.props.loadingNumberOfDataSets)
            numberOfResult = <Spinner color="primary" />;
        else if (this.props.numberOfDataSets !== null)
            if (this.props.numberOfDataSets === -1)
                numberOfResult =
                    <div>
                        <Button onClick={this.reloadNumberOfDataSets}><FaRedo
                            id="TooltipNumberOfDataSetsInternalServerError" /></Button>
                        <span
                            style={{ marginLeft: '3px', fontSize: '8px', fontWeight: '500' }}>Internal Server Error</span>
                    </div>;
            else
                numberOfResult = this.props.numberOfDataSets;

        let dataSets = null;
        if (this.props.loadingDataSetsError)
            dataSets =
                <div>
                    <Button onClick={this.reloadDataSets}><FaRedo id="ToolTipDataSets" /></Button>
                    <span style={{ marginLeft: '3px', fontSize: '8px', fontWeight: '500' }}>Error in Fetching dataSets from the server</span>
                </div>;
        else if (this.props.loadingDataSets)
            dataSets = <Spinner type="grow" color="primary" />;
        else if (this.props.dataSets !== null)
            dataSets = this.props.dataSets.map(
                dataSet => (
                    <Col md={{ size: 12 }} key={dataSet.uri}>
                        {this.state.isLongView ? <LongView dataSet={dataSet} /> : <ShortView dataSet={dataSet} />}
                    </Col>
                )
            );

        const filtersView =
            this.props.loadingFilters ?
                <Spinner color="primary" /> :
                this.props.loadingFiltersError ?
                    <div>
                        <Button onClick={this.reloadFilters}><FaRedo
                            id="TooltipFiltersInternalServerError" /></Button>
                        <span
                            style={{ marginLeft: '3px', fontSize: '8px', fontWeight: '500' }}>Internal Server Error</span>
                    </div>
                    :
                    <FiltersView
                        filters={this.props.filters}
                        selectedFilters={this.props.selectedFilters}
                        onAppendSelectedValues={this.props.onAppendSelectedValues}
                        onGetSearchKey={this.props.onGetSearchKey}
                        getSelectedSearchIn={this.props.getSelectedSearchIn}
                        applyFilters={this.applyFilters}
                    />
            ;

        const isMobile = this.state.screenWidth <= 700;

        return (
            <Col md='12'>
                <Row>
                    <Col xs={isMobile ? {size: 12} : {size: 9}} style={{'marginTop': '1rem'}}>

                        <Table hover bordered responsive striped style={{display: 'block'}}>
                            <thead>
                            <tr>
                                <th style={{width: '1%'}}>
                                    <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                                        <span> {numberOfResult} </span>
                                        <div style={{flexGrow: 1}}/>
                                        <Button style={{marginLeft: '2px'}} onClick={this.largeViewChanged}>
                                            {this.state.isLongView ? <FaThLarge/> : <FaThList/>}
                                        </Button>

                                        <OrderBy
                                            orderByChanged ={(orderByValue, idx) => this.orderByChanged(orderByValue, idx)}
                                        />

                                        {isMobile ? <Button style={{marginLeft: '2px'}}
                                                            onClick={this.toggleFilters}>Filters</Button> : ''}
                                        {
                                            this.state.isFiltersOpen && isMobile ? filtersView : ''}
                                    </div>

                                </th>
                            </tr>
                            </thead>
                            <tbody style={isMobile ? {
                                    display: 'block',
                                    height: '300px',
                                    'overflowX': 'hidden',
                                    width: '100%'
                                } :
                                {display: 'block', 'overflowX': 'hidden', width: '100%'}}>
                            <tr style={{display: 'block'}}>
                                <td style={{display: 'block'}}>
                                    {dataSets}
                                    <Row style={{'paddingTop': '1rem'}}>
                                        <Button className="mx-auto" style={{marginBottom: '1rem'}}
                                                onClick={this.props.load10More}
                                                disabled={this.props.dataSets === null}> Load
                                            10 more </Button>
                                    </Row>
                                </td>
                            </tr>
                            </tbody>
                        </Table>

                    </Col>
                    {
                        !isMobile &&
                        <Col md={{size: 3}}>
                            <div style={{position: 'sticky', top: '2rem'}}>
                                {filtersView}
                            </div>
                        </Col>
                    }
                </Row>
            </Col>)
    }
}

export default TableView;