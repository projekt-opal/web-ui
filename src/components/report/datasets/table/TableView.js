import React from 'react';
import {Button, Col, Modal, ModalFooter, Row, Table} from "reactstrap";
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
        dateFilters: [{name: "Issue date", fromDate: "", toDate: ""}, {name: "Modified date", fromDate: "", toDate: ""}],
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
        this.setState({isFiltersOpen: !this.state.isFiltersOpen});
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({screenWidth: window.innerWidth});
    };

    appendDate = (dates) => {
        let dateFilters = [...this.state.dateFilters];

        const prevSelectedFilter = dateFilters.find(f => f.name === dates.name);
        if (prevSelectedFilter){
            prevSelectedFilter.fromDate = dates.fromDate || "";
            prevSelectedFilter.toDate = dates.toDate || "";
        } else {
            dateFilters.push(dates);
        }

        this.setState({ dateFilters: dateFilters });
    }

    render() {
        const isMobile = this.state.screenWidth > 1 && this.state.screenWidth <= 800;
        console.log(this.props.filters);
        return (
            <Col md='12'>
                <Row>
                    {
                        isMobile ?
                            <Modal isOpen={this.state.isFiltersOpen} toggle={this.toggleFilters}>
                                <LoadingFiltersView
                                    loadingFilters={this.props.loadingFilters}
                                    loadingFiltersError={this.props.loadingFiltersError}

                                    filters={this.props.filters}
                                    appendSelectedValues={this.props.appendSelectedValues}
                                    getSearchDTO={this.props.getSearchDTO}
                                    reloadFilters={this.reloadFilters}
                                    applyFilters={this.props.applyFilters}
                                    dateFilters={this.state.dateFilters}
                                    appendDate={this.appendDate}
                                />
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.toggleFilters}>Close</Button>
                                </ModalFooter>
                            </Modal>
                            : ''}

                    <Col xs={isMobile ? {size: 12} : {size: 9}} style={{marginTop: '1rem'}}>

                        <Table hover bordered responsive striped style={{display: 'block'}}>
                            <thead style={{zIndex: 2147483647}}>
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
                                                disabled={this.props.dataSets === null || this.props.dataSets.length === this.props.numberOfDataSets}> Load
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
                                    appendSelectedValues={this.props.appendSelectedValues}
                                    getSearchDTO={this.props.getSearchDTO}
                                    reloadFilters={this.reloadFilters}
                                    applyFilters={this.props.applyFilters}
                                    dateFilters={this.state.dateFilters}
                                    appendDate={this.appendDate}
                                />}
                            </div>
                        </Col>
                    }
                </Row>
            </Col>)
    }
}

export default TableView;