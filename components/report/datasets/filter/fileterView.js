import React from 'react';
import {Button} from "reactstrap";
import CustomSelect from './customSelect';

import {FaAngleDown, FaAngleRight} from 'react-icons/fa'

class FilterView extends React.Component {

    state = {
        isExpanded: false
    };

    toggleFilterExpanded = () => {
        const isExpanded = !this.state.isExpanded;
        this.setState({isExpanded: isExpanded});
    };


    render() {
        console.log(this.props.selectedFilterValues);

        return (
            <div>
                <div style={{display: 'flex', flexFlow: 'row'}}>
                    <Button onClick={this.toggleFilterExpanded} style={{flexGrow: 1, textAlign: 'left'}}>
                        {this.state.isExpanded ? <FaAngleDown/> : <FaAngleRight/>}
                        {this.props.filter.title}
                    </Button>
                </div>
                {
                    this.state.isExpanded &&
                    <CustomSelect title={this.props.filter.title} values={this.props.filter.values}
                                  selectedValues={this.props.selectedFilterValues}
                                  onAppendSelectedValues={this.props.onAppendSelectedValues}
                    />
                }
            </div>
        );
    }
};

export default FilterView;