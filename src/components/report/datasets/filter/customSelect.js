import React from 'react';
import {Badge, Button, Spinner} from "reactstrap";
import AsyncSelect from 'react-select/async';
import {components} from 'react-select';
import createClass from "create-react-class";
import axios from '../../../../../webservice/axios-dataSets';
import {FaExternalLinkAlt} from 'react-icons/fa';
import Link from 'next/link';

const Option = createClass({
    render() {
        return (
            <div>
                <components.Option {...this.props} key={this.props.data.value}>
                    <input
                        type="checkbox"
                        checked={this.props.isSelected}
                        onChange={e => null}
                    />{" "}
                    <label>{this.props.value} </label>
                    {
                        this.props.data.externalLink &&
                        <span>
                        <Link href={"/view/one?uri=" + this.props.data.uri + "&label=" + this.props.label}>
                            <a target="_blank" style={{textDecoration: 'none', color: 'gray'}}>
                                    <FaExternalLinkAlt/>
                            </a>
                        </Link>
                    </span>}
                    {
                        this.props.data.count !== -1 ?
                            <Badge style={{marginLeft: '2px'}} pill>{this.props.data.count}</Badge>
                            :
                            <Spinner size="sm"/>
                    }
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
        prevInputValue: ''
    };

    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({inputValue});
        return inputValue;
    };

    getOptions = (inputValue) => {
        this.setState({prevInputValue: inputValue}, () => {
            if (!this.props.filter.isTypeStatic) {
                let searchKey = '';
                if (this.props.getSearchKey) searchKey = this.props.getSearchKey();
                let selectedSearchIn = [];
                if (this.props.getSelectedSearchIn) selectedSearchIn = this.props.getSelectedSearchIn();
                axios.get(
                    `/filteredOptions/?filterType=${this.props.filter.title}&searchKey=${searchKey}&searchIn=${selectedSearchIn}&filterText=${inputValue}`)
                    .then(response => {
                        if (this.state.prevInputValue === inputValue) {
                            let options = response.data.values;
                            this.selectAsync.state.loadedOptions = options;
                            this.setState({isButtonClicked: false});
                            return options;
                        }
                    })
                    .catch(err => {
                        return err;
                    });
            } else {
                if (this.state.prevInputValue === inputValue) {
                    const options = this.props.filter.values.filter(v => v.label.toLowerCase().includes(inputValue.toLowerCase()));
                    this.selectAsync.state.loadedOptions = options;
                    this.setState({isButtonClicked: false});
                    return options;

                }
            }
        })

    };

    changeHandler(values) {
        if (values) {
            const selectedFilter = {
                title: this.props.filter.title,
                uri: this.props.filter.uri,
                values: values
            };
            this.props.appendSelectedValues(selectedFilter);
        } else {
            this.props.appendSelectedValues({
                    title: this.props.filter.title,
                    externalLink: this.props.filter.externalLink,
                    uri: this.props.filter.uri,
                    values: []
                }
            );
        }
    };

    clickButton = (inputValue) => {
        this.setState({isButtonClicked: true});
        this.getOptions(inputValue);
    };

    noOptionsMessage = (props) => {
        if (props.inputValue !== '') {
            return this.state.isButtonClicked ?
                (
                    <div>
                        <Spinner size="sm"/>
                        <Button onClick={this.stopSearch} color="link" style={{background: 'transparent'}}>X</Button>
                    </div>
                ) : (
                    <button type="button"
                            className="btn btn-primary btn-block"
                            onClick={() => this.clickButton(props.inputValue)}>
                        Search
                    </button>
                );
        }
    };

    stopSearch = () => {
        this.setState({isButtonClicked: false});
    };

    render() {
        let optionsArr = [];
        if (this.props.selectedValues.length > 0) {
            optionsArr = this.props.selectedValues.map(selectedValue => {
                    return {
                        label: selectedValue.value,
                        value: selectedValue.value,
                        externalLink: this.props.filter.externalLink,
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
                        defaultOptions={this.props.filter.values}
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
