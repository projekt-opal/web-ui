import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loadingDataSets: false,
    loadingError: false,
    dataSets: null,
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_DATASETS_START:
            return updateObject(state, {loadingDataSets: true});
        case actionTypes.FETCH_DATASETS_SUCCESS:
            return updateObject(state, {loadingError:false, loadingDataSets: true, dataSets: action.dataSets});
        case actionTypes.FETCH_DATASETS_FAIL:
            return updateObject(state, {loadingDataSets: false, loadingError: true});
    }
    return state;
};

export default reducer;