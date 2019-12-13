import React from 'react';
import {Button, Spinner} from "reactstrap";
import FiltersView from "../filter/FiltersView";
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
            <FiltersView
                filters={props.filters}
                selectedFilters={props.selectedFilters}
                onAppendSelectedValues={props.onAppendSelectedValues}
                onGetSearchKey={props.onGetSearchKey}
                getSelectedSearchIn={props.getSelectedSearchIn}
                applyFilters={props.applyFilters}
            />
};

export default LoadingFiltersView;