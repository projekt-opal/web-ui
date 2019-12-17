import React from 'react';
import {Button, Col, Row, Table} from "reactstrap";
import {FaThLarge, FaThList} from "react-icons/fa";
import OrderBy from "../dataset/OrderBy";
import LoadingNumberOfResult from "./LoadingNumberOfResult";
import LoadingDataSets from "./LoadingDataSets";
import LoadingFiltersView from "./LoadingFiltersView";

class TableView extends React.Component {
    state = {
        isLongView: true,

        isTooltipNumberOfDataSetsOpen: false,
        isTooltipDataSetsOpen: false,

        screenWidth: 0,

        isFiltersOpen: false,
        lastSelectedFilterValues: []
    };

    componentDidMount() {
        this.props.fetchDataSets();
        this.props.getNumberOfDataSets();
        this.props.fetchFiltersList();
        this.handleWindowSizeChange();
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    largeViewChanged = () => {
        let newState = {...this.state};
        newState.isLongView = !newState.isLongView;
        this.setState(newState);
    };

    applyFilters = () => {
        this.setState({lastSelectedFilterValues: this.props.selectedFilters}, () => {
            this.props.fetchDataSets();
            this.props.getNumberOfDataSets();
        });
    };

    reloadFilters = () => {
        this.props.fetchFiltersList();
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
            this.props.replaceSelectedFilters(this.state.lastSelectedFilterValues);
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
        const isMobile = this.state.screenWidth > 1 && this.state.screenWidth <= 800;

        return (
            <Col md='12'>
                <Row>
                    <Col xs={isMobile ? {size: 12} : {size: 9}} style={{marginTop: '1rem'}}>

                        <Table hover bordered responsive striped style={{display: 'block'}}>
                            <thead>
                            <tr>
                                <th style={{width: '1%'}}>
                                    <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                                        <span> {<LoadingNumberOfResult
                                            loadingNumberOfDataSetsError={this.props.loadingNumberOfDataSetsError}
                                            loadingNumberOfDataSets={this.props.loadingNumberOfDataSets}
                                            numberOfDataSets={this.props.numberOfDataSets}
                                            reloadNumberOfDataSets={this.reloadNumberOfDataSets}
                                        />} </span>
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
                                            this.state.isFiltersOpen && isMobile ? <LoadingFiltersView
                                                loadingFilters={this.props.loadingFilters}
                                                loadingFiltersError={this.props.loadingFiltersError}

                                                filters={this.props.filters}
                                                selectedFilters={this.props.selectedFilters}
                                                appendSelectedValues={this.props.appendSelectedValues}
                                                getSearchKey={this.props.getSearchKey}
                                                getSelectedSearchIn={this.props.getSelectedSearchIn}
                                                reloadFilters={this.reloadFilters}
                                                applyFilters={this.applyFilters}
                                            /> : ''}
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
                                    {<LoadingDataSets
                                        loadingDataSetsError={this.props.loadingDataSetsError}
                                        loadingDataSets={this.props.loadingDataSets}
                                        dataSets={this.props.dataSets}
                                        isLongView={this.state.isLongView}
                                        reloadDataSets={this.reloadDataSets}
                                    />}
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
                                {<LoadingFiltersView
                                    loadingFilters={this.props.loadingFilters}
                                    loadingFiltersError={this.props.loadingFiltersError}
                                    filters={this.props.filters}
                                    selectedFilters={this.props.selectedFilters}
                                    appendSelectedValues={this.props.appendSelectedValues}
                                    getSearchKey={this.props.getSearchKey}
                                    getSelectedSearchIn={this.props.getSelectedSearchIn}
                                    reloadFilters={this.reloadFilters}
                                    applyFilters={this.applyFilters}
                                />}
                            </div>
                        </Col>
                    }
                </Row>
            </Col>)
    }
}

export default TableView;