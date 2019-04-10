import * as actionTypes from './actionTypes';

export const searchKeyChanged = (key) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SEARCH_KEY_CHANGED,
            key: key
        });
    }
};

export const searchInChanged = (searchDomain) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SEARCH_IN_CHANGED,
            searchDomain: searchDomain
        });
    }
};
export const searchInRemoved = (searchDomain) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SEARCH_IN_REMOVED,
            searchDomain: searchDomain
        });
    }
};