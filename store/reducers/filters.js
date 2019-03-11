import * as actionTypes from '../actions/filters/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loadingFilters: false,
    loadingFiltersError: false,
    filters: null
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_FITLERS_START:
            return updateObject(state, {loadingFilters: true, loadingFiltersError: false});
        case actionTypes.FETCH_FITLERS_SUCCESS:
            return updateObject(state, {loadingFilters: false, loadingFiltersError: false, filters: action.filters});
        case actionTypes.FETCH_FITLERS_FAIL:
            return updateObject(state, {loadingFilters: false, loadingFiltersError: true});
    }
    return state;
};

export default reducer;