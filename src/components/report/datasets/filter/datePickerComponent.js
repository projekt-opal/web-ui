import React from 'react';
import {FormGroup, Label, Input, ListGroup, ListGroupItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import { withTranslation } from 'react-i18next';

class DatePickerComponent extends React.Component {

    state = {
        fromDate: "",
        toDate: "",
        dropdownOpen: false,
        name: "Type of date",
    };

    handleChangeName(e) {
        this.setState({name: e.currentTarget.textContent});
        let predValues = this.props.dateFilters.filter(f => f.name === e.currentTarget.textContent)[0];
        this.setState({
            fromDate: predValues.fromDate,
            toDate: predValues.toDate,
        })
    }

    handleChangeFrom(event) {
        this.setState({fromDate: event.target.value});
        this.props.appendDate({name: this.state.name, fromDate: event.target.value, toDate: this.state.toDate});
    }
    handleChangeTo(event) {
        this.setState({toDate: event.target.value});
        this.props.appendDate({name: this.state.name, fromDate: this.state.fromDate, toDate: event.target.value});
    }
    toggle = () => {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }

    render() {
      const { t } = this.props;
        return (   
            <ListGroup style={{marginTop: '10px'}}>
                <ListGroupItem>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle caret>
                        {t(this.state.name)}
                        </DropdownToggle>
                      <DropdownMenu>
                      {this.props.dateFilters.map((f,idx) => {
                        return (
                            <DropdownItem key={idx} value={this.state.name} onClick={this.handleChangeName.bind(this)}>{f.name}</DropdownItem>
                        )
                      })}
                      </DropdownMenu>
                    </Dropdown>
                    <div><span>{t('From')} 
                        <Input style={{width: 'auto', display: 'inline', margin: '10px'}}
                          type="date"
                          name="date"
                          id="fromDate"
                          value={this.state.fromDate} 
                          onChange={this.handleChangeFrom.bind(this)}
                          placeholder="date placeholder"
                        />   
                    </span></div>
                    <div><span>{t('To')}
                        <Input style={{width: 'auto', display: 'inline', margin: '10px'}}
                              type="date"
                              name="date"
                              id="toDate"
                              value={this.state.toDate} 
                              onChange={this.handleChangeTo.bind(this)}
                              placeholder="date placeholder"
                        /></span>
                    </div>
                </ListGroupItem>
            </ListGroup>    
        );
    }
}

export default withTranslation()(DatePickerComponent);