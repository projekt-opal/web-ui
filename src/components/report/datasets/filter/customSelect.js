import React from 'react';
import {Badge, Button, Spinner} from "reactstrap";
import AsyncSelect from 'react-select/async';
import {components} from 'react-select';
import createClass from "create-react-class";
import axios from '../../../../../webservice/axios-dataSets';
import {FaExternalLinkAlt} from 'react-icons/fa';
import Link from 'next/link';
import chroma from 'chroma-js';


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
                        <Link href={"/view/one?uri=" + this.props.data.uri + "&label=" + this.props.value}>
                            <a target="_blank" style={{textDecoration: 'none', color: 'gray'}}>
                                    <FaExternalLinkAlt/>
                            </a>
                        </Link>
                    </span>}
                    {
                        this.props.data.count.absolute !== -1 ?
                            <Badge style={{marginLeft: '2px'}} pill>{this.props.data.count.absolute}</Badge>
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
            <span>{props.data.value}</span>
        </components.MultiValue>
    );
};

const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        width: state.selectProps.width,
        borderBottom: '1px dotted pink',
        color: state.selectProps.menuColor,
        padding: 20,
    }),
    control: (_, {selectProps: {width}}) => ({
        width: width
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return {...provided, opacity, transition};
    }
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
            if (!this.props.filter.hasStaticValues) {
                let searchDTO = null;
                if (this.props.getSearchDTO) searchDTO = this.props.getSearchDTO();
                axios.post(`/filteredOptions/?filterGroupTitle=${this.props.filter.filterGroupTitle}&containsText=${inputValue}`, searchDTO)
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
                filterGroupTitle: this.props.filter.filterGroupTitle,
                values: values
            };
            this.props.appendSelectedValues(selectedFilter);
        } else {
            this.props.appendSelectedValues({
                    filterGroupTitle: this.props.filter.filterGroupTitle,
                    externalLink: this.props.filter.externalLink,
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
                        <Button onClick={this.stopSearch}
                                style={{background: 'transparent', color: 'gray', border: 'none'}}>X</Button>
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

        const colourStyles = {
            control: styles => ({ ...styles, backgroundColor: 'white' }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                const color = chroma('blue');
                return {
                    ...styles,
                    backgroundColor: isDisabled
                        ? null
                        : isSelected
                            ? /*'red'*/
                             color.alpha(0.5).css()
                            : isFocused
                                ? color.alpha(0.1).css()
                                : null,
                    color: isDisabled
                        ? '#ccc'
                        : 'black'/*isSelected
                            ? chroma.contrast(color, 'white') > 2
                                ? 'blue'
                                : 'black'
                            : 'khaki'*/,
                    cursor: isDisabled ? 'not-allowed' : 'default',

                    ':active': {
                        ...styles[':active'],
                        backgroundColor: !isDisabled && (isSelected ? 'gray' : color.alpha(0.3).css()),
                    },
                };
            },
            multiValue: (styles, { data }) => {
                console.log(data);
                const color = chroma('brown');
                const alpha = data.selected.permanent ? 0.3 : 0.1;
                return {
                    ...styles,
                    backgroundColor: color.alpha(alpha).css(),
                };
            },
            multiValueLabel: (styles, { data }) => ({
                ...styles,
                // color: 'green',
            }),
            multiValueRemove: (styles, { data }) => ({
                ...styles,
                color: 'black',
                // ':hover': {
                //     backgroundColor: 'lightblue',
                //     color: 'blue',
                // },
            }),
        };

        let optionsArr = [];
        this.props.filter.values.forEach(v => {
            if(v.selected) {
                if (v.selected.temporary) {
                    optionsArr.push({
                        label: v.value,
                        value: v.value,
                        selected: v.selected
                    });
                }
            }
        });

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
                        styles={colourStyles}
                    />
                </div>
            </div>
        );

    }
}

export default CustomSelect;
