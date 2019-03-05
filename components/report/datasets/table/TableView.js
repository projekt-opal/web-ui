import React from 'react';
import {Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, Spinner, Table} from "reactstrap";
import {FaThLarge, FaThList} from "react-icons/fa";
import ShortView from "../dataset/ShortView";
import LongView from "../dataset/LongView";

import Axios from '../../../../webservice/axios-dataSets';

class TableView extends React.Component {

    state = {
        dropdownOpen: false,
        listOrderByValues: ['title', 'issue date', 'theme'],
        selectedOrder: 0,

        isLongView: true,

        data: null,
        numberOfDataSets: null

    };

    componentDidMount() {
        Axios.get("/dataSets/getSubList?searchQuery=Pa")
            .then(response => {
                const data = response.data;
                this.setState({data: data})
            });
        Axios.get("/dataSets/getNumberOfDataSets?searchQuery=Pa")
            .then(response => {
                const num = response.data;
                this.setState({numberOfDataSets : num})
            });
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
        null
    };

    render() {

        let numberOfResult = <Spinner color="primary"/>;
        if(this.state.numberOfDataSets)
            numberOfResult = this.state.numberOfDataSets;

        let dataSets = <Spinner type="grow" color="primary"/>;
        if (this.state.data)
            dataSets = this.state.data.map(
                dataSet => (<Col md={{size: 12}} key={dataSet.uri}>
                    {this.state.isLongView ? <LongView dataSet = {dataSet} /> : <ShortView dataSet = {dataSet} />}
                </Col>)
            );

        return (
            <Col md={{size: 12}}>
                <Row>
                    <Col md={{size: 12}}>
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
                </Row>
                <Row>
                    <Button className="mx-auto"> Load 10 more </Button>
                </Row>
            </Col>
        )
    }
}

export default TableView;