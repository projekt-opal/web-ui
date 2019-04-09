import * as actionTypes from '../actions/datasets/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loadingDataSets: false,
    loadingDataSetsError: false,
    dataSets: null,

    loadingNumberOfDataSets: false,
    loadingNumberOfDataSetsError: false,
    numberOfDataSets:null
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_DATASETS_START:
            return updateObject(state, {loadingDataSets: true, loadingDataSetsError:false, dataSets: null});
        case actionTypes.FETCH_DATASETS_SUCCESS:
            return updateObject(state, {loadingDataSetsError:false, loadingDataSets: false, dataSets: action.dataSets});
        case actionTypes.FETCH_DATASETS_FAIL:
            return updateObject(state, {loadingDataSets: false, loadingDataSetsError: true, dataSets: null});

        case actionTypes.GET_NUMBER_DATASETS_START:
            return updateObject(state, {loadingNumberOfDataSets: true, loadingNumberOfDataSetsError: false, numberOfDataSets: null});
        case actionTypes.GET_NUMBER_DATASETS_SUCCESS:
            return updateObject(state, {loadingNumberOfDataSets: false, loadingNumberOfDataSetsError: false, numberOfDataSets: action.numberOfDataSets});
        case actionTypes.GET_NUMBER_DATASETS_FAIL:
            return updateObject(state, {loadingNumberOfDataSets: false, loadingNumberOfDataSetsError: true, numberOfDataSets: null});

        case actionTypes.LOAD_10_MORE:
            return updateObject(state, { dataSets: state.dataSets.concat(action.additionalDataSets)})
    }
    return state;
};

export default reducer;