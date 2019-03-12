import * as actionTypes from '../actions/filters/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    loadingFilters: false,
    loadingFiltersError: false,
    filters: null,

    selectedFilters: []
};

const updateSelectedFilters = (state, property, uri) => {
    let selectedFilters = [...state.selectedFilters];
    console.log(selectedFilters);
    const selectedFilter = selectedFilters.find(x => x.property === property);
    if (selectedFilter) {//if it is already there must add/remove it to values
        const it = selectedFilter.values.find(x => x === uri);
        if (it) {//remove
            selectedFilter.values = selectedFilter.values.filter(v => v !== it);
            if (selectedFilter.values.length === 0)
                selectedFilters = selectedFilters.filter( filter => filter !== selectedFilter);
        } else//add
            selectedFilter.values = selectedFilter.values.concat(uri);
    } else
        selectedFilters = selectedFilters.concat({property: property, values: [uri]});
    return {selectedFilters: selectedFilters};
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_FITLERS_START:
            return updateObject(state, {loadingFilters: true, loadingFiltersError: false});
        case actionTypes.FETCH_FITLERS_SUCCESS:
            return updateObject(state, {loadingFilters: false, loadingFiltersError: false, filters: action.filters});
        case actionTypes.FETCH_FITLERS_FAIL:
            return updateObject(state, {loadingFilters: false, loadingFiltersError: true});

        case actionTypes.APPEND_FILTER:
            return updateObject(state, updateSelectedFilters(state, action.property, action.uri));
    }
    return state;
};

export default reducer;