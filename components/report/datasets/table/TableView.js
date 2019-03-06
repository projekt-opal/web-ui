import React from 'react';
import {Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, Spinner, Table} from "reactstrap";
import {FaThLarge, FaThList} from "react-icons/fa";
import ShortView from "../dataset/ShortView";
import LongView from "../dataset/LongView";
import FiltersView from '../filter/FiltersView';

import Axios from '../../../../webservice/axios-dataSets';

class TableView extends React.Component {

    state = {
        dropdownOpen: false,
        listOrderByValues: ['title', 'issue date', 'theme'],
        selectedOrder: 0,

        isLongView: true,

        dataSets: null,
        numberOfDataSets: null,
        filters: null

    };

    componentDidMount() {
        Axios.get("/dataSets/getSubList")
            .then(response => {
                const dataSets = response.data;
                this.setState({dataSets: dataSets})
            });
        Axios.get("/dataSets/getNumberOfDataSets")
            .then(response => {
                const num = response.data;
                this.setState({numberOfDataSets : num})
            });
        Axios.get("/filters/list")
            .then(response => {
                this.setState({filters : response.data});
            })
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
        let s = "/dataSets/getSubList?low="+ this.state.dataSets.length;
        Axios.get(s)
            .then(response => {
                let dataSets = response.data;
                dataSets = [...this.state.dataSets].concat(dataSets);
                console.log(dataSets);
                this.setState({dataSets: dataSets})
            });
    };

    render() {

        let numberOfResult = <Spinner color="primary"/>;
        if(this.state.numberOfDataSets)
            numberOfResult = this.state.numberOfDataSets;

        let dataSets = <Spinner type="grow" color="primary"/>;
        if (this.state.dataSets)
            dataSets = this.state.dataSets.map(
                dataSet => (<Col md={{size: 12}} key={dataSet.uri}>
                    {this.state.isLongView ? <LongView dataSet = {dataSet} /> : <ShortView dataSet = {dataSet} />}
                </Col>)
            );

        let filterView = this.state.filters ? <FiltersView filters={this.state.filters}/> : <Spinner color="primary"/>;


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
                    </Col>
                    <Col md={{size: 2}}>
                        {filterView}
                    </Col>
                </Row>
                <Row>
                    <Button className="mx-auto" onClick={this.load10More}> Load 10 more </Button>
                </Row>
            </Col>
        )
    }
}

export default TableView;