import React from 'react';
import {Button, Spinner} from "reactstrap";
import FiltersList from "../filter/FiltersList";
import {FaRedo} from "react-icons/fa";

const LoadingFiltersView = (props) => {
    return props.loadingFilters ? <Spinner color="primary"/> :
        props.loadingFiltersError ?
            <div>
                <Button onClick={props.reloadFilters}><FaRedo
                    id="TooltipFiltersInternalServerError"/></Button>
                <span
                    style={{marginLeft: '3px', fontSize: '8px', fontWeight: '500'}}>Internal Server Error</span>
            </div>
            :
            <FiltersList
                filters={props.filters}
                selectedFilters={props.selectedFilters}
                appendSelectedValues={props.appendSelectedValues}
                getSearchDTO={props.getSearchDTO}
                applyFilters={props.applyFilters}
                dateFilters={props.dateFilters}
                appendDate={props.appendDate}
            />
};

export default LoadingFiltersView;