import * as actionTypes from '../actions/searchkey/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    key : '',
    searchIn: ['title', 'description', 'keyword'],
    selectedSearchIn: [false, false, false]
};


const getUpdatedSearchInChanged = (state, idx) => {
    let newSelectedSearchIn = [...state.selectedSearchIn];
    newSelectedSearchIn[idx] = !newSelectedSearchIn[idx];
    return {selectedSearchIn: newSelectedSearchIn};
};

const getUpdatedSearchInRemoved = (state, idx) => {
    let newSelectedSearchIn = [...state.selectedSearchIn];
    newSelectedSearchIn[idx] = false;
    return {selectedSearchIn: newSelectedSearchIn};
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SEARCH_KEY_CHANGED:
            return updateObject(state, {key: action.key});
        case actionTypes.SEARCH_IN_CHANGED:
            return updateObject(state, getUpdatedSearchInChanged(state, action.idx));
        case actionTypes.SEARCH_IN_REMOVED:
            return updateObject(state, getUpdatedSearchInRemoved(state, action.idx));
    }
    return state;
};

export default reducer;