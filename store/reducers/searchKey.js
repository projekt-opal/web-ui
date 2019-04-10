import * as actionTypes from '../actions/searchkey/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    key : '',
    searchIn: ['title', 'description', 'keyword'],
    selectedSearchIn: []
};


const getUpdatedSearchInChanged = (state, searchDomain) => {
    let newSelectedSearchIn = [...state.selectedSearchIn];
    if(newSelectedSearchIn.includes(searchDomain))
        newSelectedSearchIn = newSelectedSearchIn.filter(x => x !== searchDomain);
    else
        newSelectedSearchIn = newSelectedSearchIn.concat(searchDomain);
    return {selectedSearchIn: newSelectedSearchIn};
};

const getUpdatedSearchInRemoved = (state, searchDomain) => {
    let newSelectedSearchIn = [...state.selectedSearchIn];
    newSelectedSearchIn = newSelectedSearchIn.filter(x => x !== searchDomain);
    return {selectedSearchIn: newSelectedSearchIn};
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SEARCH_KEY_CHANGED:
            return updateObject(state, {key: action.key});
        case actionTypes.SEARCH_IN_CHANGED:
            return updateObject(state, getUpdatedSearchInChanged(state, action.searchDomain));
        case actionTypes.SEARCH_IN_REMOVED:
            return updateObject(state, getUpdatedSearchInRemoved(state, action.searchDomain));
    }
    return state;
};

export default reducer;