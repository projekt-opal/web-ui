import React from 'react';
import { Button } from "reactstrap";
import CustomSelect from './customSelect';

import { FaAngleDown, FaAngleRight } from 'react-icons/fa'
import TableView from "../table/TableView";

class FilterView extends React.Component {

    state = {
        isExpanded: false
    };

    toggleFilterExpanded = () => {
        const isExpanded = !this.state.isExpanded;
        this.setState({ isExpanded: isExpanded });
    };


    render() {
        return (
            <div>
                <div style={{ display: 'flex', flexFlow: 'row' }}>
                    <Button onClick={this.toggleFilterExpanded} style={{ flexGrow: 1, textAlign: 'left' }}>
                        {this.state.isExpanded ? <FaAngleDown /> : <FaAngleRight />}
                        {this.props.filter.title}
                    </Button>
                </div>
                {
                    this.state.isExpanded &&
                    <CustomSelect
                        filter={this.props.filter}
                        uri={this.props.filter.uri}
                        values={this.props.filter.values}
                        getSelectedSearchIn={this.props.getSelectedSearchIn}
                        selectedValues={this.props.selectedFilterValues}
                        onAppendSelectedValues={this.props.onAppendSelectedValues}
                        onGetSearchKey={this.props.onGetSearchKey}
                    />
                }
            </div>
        );
    }
};

export default FilterView;