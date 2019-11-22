import React from 'react';
import { Badge, Button, Spinner } from "reactstrap";
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import createClass from "create-react-class";
import axios from '../../../../webservice/axios-dataSets';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';

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
                    <span>
                        <Link>
                            /**TODO: The hyperlink has to be modified after the filterView for ViewOne is changed. */
                            <a href="http://localhost:3000/view/one" target="_blank">
                                <Button
                                    style={{ background: 'transparent', border: 'none', color: 'black' }}
                                    onClick={() => storeRelatedLicenseInfo(this.props.value)}>
                                    <FaExternalLinkAlt />
                                </Button>
                            </a>
                        </Link>
                    </span>
                    {
                        this.props.data.count !== -1 ?
                            <Badge style={{ marginLeft: '2px' }} pill>{this.props.data.count}</Badge>
                            :
                            <Spinner size="sm" />
                    }
                </components.Option>
            </div>
        );
    }
});

const storeRelatedLicenseInfo = (filterValue) => {
    window.localStorage.setItem("LICENSE_NAME", filterValue);
}

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
        this.setState({ inputValue });
        return inputValue;
    };

    getOptions = (inputValue) => {
        this.setState({ prevInputValue: inputValue }, () => {
            const searchKey = this.props.onGetSearchKey();
            const selectedSearchIn = this.props.getSelectedSearchIn();
            axios.get(`/filteredOptions/?filterType=${this.props.title}&searchKey=${searchKey}&searchIn=${selectedSearchIn}&filterText=${inputValue}`)
                .then(response => {
                    if (this.state.prevInputValue === inputValue) {
                        let options = response.data.values;
                        this.selectAsync.state.loadedOptions = options;
                        this.setState({ isButtonClicked: false });
                        return options;
                    }
                })
                .catch(err => {
                    return err;
                });
        });
    };

    changeHandler(values) {
        if (values) {
            const selectedFilter = {
                title: this.props.title,
                uri: this.props.uri,
                values: values
            };
            this.props.onAppendSelectedValues(selectedFilter);
        } else {
            this.props.onAppendSelectedValues({
                title: this.props.title,
                uri: this.props.uri,
                values: []
            }
            );
        }
    };

    clickButton = (inputValue) => {
        this.setState({ isButtonClicked: true });
        this.getOptions(inputValue);
    };

    noOptionsMessage = (props) => {
        if (props.inputValue !== '') {
            return this.state.isButtonClicked ?
                (
                    <div>
                        <Spinner size="sm" />
                        <Button onClick={this.stopSearch} color="link" style={{ background: 'transparent' }} >X</Button>
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

    render() {
        console.log(window.location.href);
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
                        components={{ Option, MultiValue }}
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

    stopSearch = () => {
        this.setState({ isButtonClicked: false });
    }
}

export default CustomSelect;
