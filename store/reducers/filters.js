import * as actionTypes from '../actions/filters/actionTypes';
import {updateObject, addObject} from '../utility';

const initialState = {
    loadingFilters: false,
    loadingFiltersError: false,
    filters: [],
    titles: [],
    values: [],

    selectedFilters: [],
    selectedValues: [],
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

const updateSelectedValues = (state, title, value, label) => {
    let selectedValues = [...state.selectedValues];
    if(value === null){
        let arr = selectedValues.filter(i => title !== i.title );
        //selectedValues = [];
        selectedValues = arr;
    }
    if(value && !selectedValues.some(x => value === x.value)){
        selectedValues.push({title: title, value: value, label: label});
    }
    return {selectedValues: selectedValues};
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_FITLERS_START:
            return updateObject(state, {loadingFilters: true, loadingFiltersError: false});
        case actionTypes.FETCH_FITLERS_SUCCESS:
            return addObject(state, {loadingFilters: false, loadingFiltersError: false, filters: action.filters});
        case actionTypes.FETCH_FITLERS_FAIL:
            return updateObject(state, {loadingFilters: false, loadingFiltersError: true});
        case actionTypes.FETCH_HEADERS:
            return updateObject(state, {loadingFilters: false, loadingFiltersError: false, titles: action.titles});
        case actionTypes.FETCH_VALUES:
            return addObject(state, {loadingFilters: false, loadingFiltersError: false, values: action.values});
    

        case actionTypes.APPEND_FILTER:
            return updateObject(state, updateSelectedFilters(state, action.property, action.uri));
                    case actionTypes.APPEND_FILTER:
        case actionTypes.APPEND_FILTER_VALUE:            
            return updateObject(state, updateSelectedValues(state, action.title, action.value, action.label));
    }
    return state;
};

export default reducer;