import * as actionTypes from '../actions/datasets/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isModalOpen: false,
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.TOGGLE_MODAL:
            return updateObject(state, {isModalOpen: action.isModalOpen});
        case actionTypes.LOAD_10_MORE:
            return updateObject(state, { dataSets: state.dataSets.concat(action.additionalDataSets)})
    }
    return state;
};

export default reducer;