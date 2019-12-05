import React from 'react';
import {Button, Col, Row, Spinner, Table} from "reactstrap";
import {FaRedo, FaThLarge, FaThList} from "react-icons/fa";
import FiltersView from '../filter/FiltersView';
import OrderBy from "../dataset/OrderBy";
import LoadingNumberOfResult from "./LoadingNumberOfResult";
import LoadingDataSets from "./LoadingDataSets";

class TableView extends React.Component {
    state = {
        isLongView: true,

        isTooltipNumberOfDataSetsOpen: false,
        isTooltipDataSetsOpen: false,

        screenWidth: 0,

        isFiltersOpen: false,
        lastSelectedValues: []
    };

    componentDidMount() {
        this.props.fetchDataSets();
        this.props.getNumberOfDataSets();
        this.props.onFetchFilters();
        this.handleWindowSizeChange();
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    largeViewChanged = () => {
        let newState = {...this.state};
        newState.isLongView = !newState.isLongView;
        this.setState(newState);
    };

    applyFilters = () => {
        this.setState({lastSelectedValues: this.props.selectedFilters});
        this.props.fetchDataSets();
        this.props.getNumberOfDataSets();
    };

    reloadFilters = () => {
        this.props.onFetchFilters();
    };

    reloadNumberOfDataSets = () => {
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
        this.setState({isFiltersOpen: !this.state.isFiltersOpen});
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({screenWidth: window.innerWidth});

    };

    render() {
        let numberOfResult = <LoadingNumberOfResult
            loadingNumberOfDataSetsError = {this.props.loadingNumberOfDataSetsError}
            loadingNumberOfDataSets = {this.props.loadingNumberOfDataSets}
            numberOfDataSets = {this.props.numberOfDataSets}
            reloadNumberOfDataSets={this.reloadNumberOfDataSets}
        />;

        let dataSets = <LoadingDataSets
            loadingDataSetsError = {this.props.loadingDataSetsError}
            loadingDataSets = {this.props.loadingDataSets}
            dataSets = {this.props.dataSets}
            isLongView={this.state.isLongView}
            reloadDataSets={this.reloadNumberOfDataSets}
        />;

        const filtersView =
            this.props.loadingFilters ?
                <Spinner color="primary"/> :
                this.props.loadingFiltersError ?
                    <div>
                        <Button onClick={this.reloadFilters}><FaRedo
                            id="TooltipFiltersInternalServerError"/></Button>
                        <span
                            style={{marginLeft: '3px', fontSize: '8px', fontWeight: '500'}}>Internal Server Error</span>
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

        const isMobile = this.state.screenWidth > 1 && this.state.screenWidth <= 800;

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
                                            orderByChanged={this.props.orderByChanged}
                                            isMobile={isMobile}
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