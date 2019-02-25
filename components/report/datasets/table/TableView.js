import React from 'react';
import {Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, Table} from "reactstrap";
import {FaThLarge, FaThList} from "react-icons/fa";
import ShortView from "../dataset/ShortView";
import LongView from "../dataset/LongView";


class TableView extends React.Component {

    state = {
        dropdownOpen: false,
        listOrderByValues: ['title', 'issue date', 'theme'],
        selectedOrder: 0,

        isLongView: true

    };

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

    render() {

        const view = this.state.isLongView ? <LongView/> : <ShortView/>;

        return (
            <Col md={{size: 12}}>
                <Row>
                    <Col md={{size: 12}}>
                        <Table hover bordered responsive striped>
                            <thead>
                            <tr>
                                <th>
                                    <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                                        <span> 12345 dataSets </span>
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
                                    <Col md={{size: 12}}>
                                        {view}
                                    </Col>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Col md={{size: 12}}>
                                        {view}
                                    </Col>
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