import React from 'react';
import {Table, Col, Button, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu} from "reactstrap";
import {FaThLarge, FaThList} from "react-icons/fa";

class TableView extends React.Component {

    state = {
        dropdownOpen: false,
        listOrderByValues: ['title', 'issue date', 'theme'],
        selectedOrder: 0,

        largeView: true

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
        newState.largeView = !newState.largeView;
        this.setState(newState);
    }

    render() {
        return (

            <Col md={{size: 12}}>
                <Table hover bordered responsive striped>
                    <thead>
                    <tr>
                        <th>
                            <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                                <span> 12345 dataSets </span>
                                <div style={{flexGrow: 1}}/>
                                <Button style={{marginLeft:'2px'}}> Export</Button>
                                <Button style={{marginLeft:'2px'}} onClick={this.largeViewChanged}>
                                    { this.state.largeView ? <FaThLarge/> : <FaThList/> }
                                </Button>
                                <ButtonDropdown style={{marginLeft:'2px'}} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle caret>
                                        {this.state.listOrderByValues[this.state.selectedOrder]}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {
                                            this.state.listOrderByValues.map( (orderBy, idx) => {
                                                return <DropdownItem onClick={() => this.orderByChanged(idx)} active={idx === this.state.selectedOrder}>{orderBy}</DropdownItem>
                                            } )
                                        }
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </div>

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                    </tr>
                    </tbody>
                </Table>
            </Col>
        );
    }

}


export default TableView;