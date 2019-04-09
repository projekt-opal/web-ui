import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import dataSetsReducer from './reducers/dataSets';
import filtersReducer from './reducers/filters';
import searchKeyReducer from './reducers/searchKey';

const rootReducer = combineReducers({
    ds: dataSetsReducer,
    filters: filtersReducer,
    searchKey: searchKeyReducer
});


export const initStore = (initialState) => {
    return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
};