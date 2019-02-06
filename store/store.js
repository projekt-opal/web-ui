import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const initialState = {
    showFilter : true
};

export const actionTypes = {
    SHOW_FILTER: 'SHOW_FILTER'
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_FILTER:
            let newState = {...state};
            newState.showFilter = !newState.showFilter;
            return newState;
            // return Object.assign({}, state, {
            //     count: state.count + 1
            // });
        default: return state
    }
};

export const showFilter = () => dispatch => {
    return dispatch({ type: actionTypes.SHOW_FILTER })
};

export const initStore = (initialState = initialState) => {
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
};