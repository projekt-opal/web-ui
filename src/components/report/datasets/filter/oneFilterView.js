import React from 'react';
import {Button} from "reactstrap";
import CustomSelect from './customSelect';

import {FaAngleDown, FaAngleRight} from 'react-icons/fa'
import {withTranslation} from 'react-i18next';

class OneFilterView extends React.Component {

    state = {
        isExpanded: false
    };

    toggleFilterExpanded = () => {
        const isExpanded = !this.state.isExpanded;
        this.setState({isExpanded: isExpanded});
    };

    render() {
        console.log(this.props.filter);

        const {t} = this.props;
        const extendedFilter = this.props.filter;
        if(!extendedFilter) return null;
        extendedFilter.values = extendedFilter.values.map(v => {
            v.externalLink = extendedFilter.externalLink;
            v.label = v.value;
            return v;
        });

        return (
            <div>
                <div style={{display: 'flex', flexFlow: 'row'}}>
                    <Button onClick={this.toggleFilterExpanded} style={{flexGrow: 1, textAlign: 'left'}}>
                        {this.state.isExpanded ? <FaAngleDown/> : <FaAngleRight/>}
                        {t(extendedFilter.filterGroupTitle)}
                    </Button>
                </div>
                {
                    this.state.isExpanded &&
                    <CustomSelect
                        filter={extendedFilter}
                        getSelectedSearchIn={this.props.getSelectedSearchIn}
                        appendSelectedValues={this.props.appendSelectedValues}
                        getSearchKey={this.props.getSearchKey}
                    />
                }
            </div>
        );
    }
};

export default withTranslation()(OneFilterView);