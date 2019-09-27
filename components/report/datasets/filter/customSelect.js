import React from 'react';
import {Badge, Button, ListGroup, ListGroupItem} from "reactstrap";
import AsyncSelect from 'react-select/async';
import Select, { components } from 'react-select';
import createClass from "create-react-class";
import {connect} from 'react-redux';
import * as actionCreators from '../../../../store/actions/index';
import axios from '../../../../webservice/axios-dataSets';

const Option = createClass({
  render() {
    return (
      <div>
        <components.Option {...this.props} key={this.props.data.label}>
          <input
            type="checkbox"
            checked={this.props.isSelected}
            onChange={e => null}
          />{" "}
          <label>{this.props.value} </label>
          <Badge style={{marginLeft: '2px'}} pill>{this.props.data.count}</Badge>
        </components.Option>
      </div>
    );
  }
});

const MultiValue = props => {
  return (
    <components.MultiValue {...props}>
      <span>{props.data.label}</span>
    </components.MultiValue>
  );
};

const filterOptions = (inputValue) => {
  // request after typing in search and after clicking the button

  axios.get("/filteredOptions", {inputValue: inputValue})
            .then(response => {
                const options = response.data;
                return options;
            })
            .catch( err => {
                return err;
            });

  // const options = [
  //         { value: 'chocolate', label: 'Chocolate' },
  //         { value: 'strawberry', label: 'Strawberry' },
  //         { value: 'vanilla', label: 'Vanilla' },
  //         { value: 'vanillas', label: 'Vanillas' },
  //         { value: 'vanillars', label: 'Vanrillas' },
  //         { value: 'Lhocolate', label: 'Lhocolate' },
  //         { value: 'strawberry', label: 'Strawberry' },
  //         { value: 'vanilla', label: 'Vanilla' },
  //         { value: 'vanillas', label: 'Vanillas' },
  //         { value: 'vanillars', label: 'Vanrillas' },
  //       ];
  //return options;

  // return options.filter(i =>
  //   i.label.toLowerCase().includes(inputValue.toLowerCase())
  // );
};

class CustomSelect extends React.Component {

    state = {
        inputValue: '',
        isButtonClicked: false,
    };

    handleInputChange = (newValue) => {
      const inputValue = newValue.replace(/\W/g, '');
      this.setState({ inputValue });
      return inputValue;
    };

    changeHandler = (e) => {
      let arr = this.props.selectedValues.filter(i => this.props.title === i.title );
      if(e && e.length < arr.length){
        this.props.onAppendSelectedValues(this.props.title, null, null);
      }
      if(e){
        e.forEach(i => this.props.onAppendSelectedValues(this.props.title, i.value, i.label));
      }
    };

    promiseOptions = (inputValue) =>{

        return new Promise(resolve => {
          setTimeout(() => {
            resolve([]);
          }, 1000);
        });
    }

    updateOptions = (inputValue) => {
      this.selectAsync.state.loadedOptions = filterOptions(inputValue);
      //defaultOptions
    }

    clickButton = (inputValue) => {
      this.setState({isButtonClicked: true});
      this.updateOptions(inputValue);
      this.setState({isButtonClicked: false});
    };

    noOptionsMessage = (props) => {
      if (props.inputValue !== '' && !this.state.isButtonClicked){
        return (
            <button type="button" 
              className="btn btn-primary btn-block" 
              onClick={()=>this.clickButton(props.inputValue)}>Search</button>
        );
      }
    };

    render() {
      let optionsArr = this.props.selectedValues.length 
      && this.props.selectedValues.filter((i) => {
        if(i.title === this.props.title){
          return {label: i.label, value: i.value};
        }; 
      });

        return (
            <div> 
                <div>
                  <AsyncSelect
                    value={optionsArr}
                    closeMenuOnSelect={false}
                    isMulti
                    components={{ Option, MultiValue }}
                    /*options={this.state.options}*/
                    hideSelectedOptions={false}
                    /*menuIsOpen*/
                    backspaceRemovesValue={false}
                    /*cacheOptions*/
                    defaultOptions={this.props.values}
                    ref={selectAsync => this.selectAsync = selectAsync}
                    loadOptions={this.promiseOptions}
                    onChange={this.changeHandler}
                    onInputChange={this.handleInputChange}
                    noOptionsMessage={this.noOptionsMessage}
                  />      
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        selectedValues: state.filters.selectedValues
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAppendSelectedValues: (title, value, label) => dispatch(actionCreators.appendSelectedValues(title, value, label)),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(CustomSelect);
 
