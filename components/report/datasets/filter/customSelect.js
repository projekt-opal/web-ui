import React from 'react';
import {Badge} from "reactstrap";
import AsyncSelect from 'react-select/async';
import {components} from 'react-select';
import createClass from "create-react-class";
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

class CustomSelect extends React.Component {

    state = {
        inputValue: '',
        isButtonClicked: false,
    };

    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({inputValue});
        return inputValue;
    };

    getOptions = (inputValue) => {
        return new Promise(() => axios.get("/filteredOptions/?name=" + inputValue)
            .then(response => {
                let options = response.data;
                this.selectAsync.state.loadedOptions = options;
                this.setState({isButtonClicked: false});
                return options;
            })
            .catch(err => {
                return err;
            })
        ).then(x => console.log(x))
    };

    changeHandler(values) {
        if (values) {
            const selectedFilter = {
                title: this.props.title,
                values: values
            };
            this.props.onAppendSelectedValues(selectedFilter);
        } else {
            this.props.onAppendSelectedValues({
                    title: this.props.title,
                    values: []
                }
            );
        }
    };

    clickButton = (inputValue) => {
        this.setState({isButtonClicked: true});
        this.getOptions(inputValue).then(r => console.log(r));
    };

    noOptionsMessage = (props) => {
        if (props.inputValue !== '' && !this.state.isButtonClicked) {
            return (
                <button type="button"
                        className="btn btn-primary btn-block"
                        onClick={() => this.clickButton(props.inputValue)}>
                    Search
                </button>
            );
        }
    };

    render() {
        let optionsArr = [];
        if (this.props.selectedValues.length > 0) {
            optionsArr = this.props.selectedValues.map(selectedValue => {
                    return {
                        label: selectedValue.value,
                        value: selectedValue.value,
                        uri: selectedValue.uri
                    }
                }
            );
        }
        return (
            <div>
                <div>
                    <AsyncSelect
                        value={optionsArr}
                        closeMenuOnSelect={false}
                        isMulti
                        components={{Option, MultiValue}}
                        /*options={this.state.options}*/
                        hideSelectedOptions={false}
                        /*menuIsOpen*/
                        backspaceRemovesValue={false}
                        /*cacheOptions*/
                        defaultOptions={this.props.values}
                        ref={selectAsync => this.selectAsync = selectAsync}
                        onChange={this.changeHandler.bind(this)}
                        onInputChange={this.handleInputChange}
                        noOptionsMessage={this.noOptionsMessage}
                    />
                </div>
            </div>
        );

    }
}

export default CustomSelect;
 