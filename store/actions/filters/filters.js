import * as actionTypes from './actionTypes';
import axios from '../../../webservice/axios-dataSets';

export const fetchFiltersStart = () => {
    return {
        type: actionTypes.FETCH_FITLERS_START
    };
};

export const fetchFiltersSuccess = (filters) => {
    return {
        type: actionTypes.FETCH_FITLERS_SUCCESS,
        filters: filters
    };
};

export const fetchFiltersFail = (error ) => {
    return {
        type: actionTypes.FETCH_FITLERS_FAIL,
        error: error
    };
};

export const fetchFilters = () => {
    return dispatch => {
        dispatch(fetchFiltersStart());
        axios.get("/filters/list")
            .then(response => {
                const filters = response.data;
                dispatch(fetchFiltersSuccess(filters));
            } )
            .catch( err => {
                dispatch(fetchFiltersFail(err));
            } );
    };
};

export const func = (selectedFilterPropertyURI, selectedFilterURI) => {
    return {
        type: actionTypes.APPEND_FILTER,
        property: selectedFilterPropertyURI,
        uri: selectedFilterURI
    };
};


export const appendSelectedFilter = (selectedFilterPropertyURI, selectedFilterURI) => {
    return dispatch => {
        dispatch(func(selectedFilterPropertyURI, selectedFilterURI));
    };
};