import * as actionTypes from './actionTypes';

export const searchKeyChanged = (key) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SEARCH_KEY_CHANGED,
            key: key
        });
    }
};

export const searchInChanged = (idx) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SEARCH_IN_CHANGED,
            idx: idx
        });
    }
};
export const searchInRemoved = (idx) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SEARCH_IN_REMOVED,
            idx: idx
        });
    }
};