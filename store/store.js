import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import dataSetsReducer from './reducers/dataSets';
import searchKeyReducer from './reducers/searchKey';

const rootReducer = combineReducers({
    ds: dataSetsReducer,
    searchKey: searchKeyReducer
});


export const initStore = (initialState) => {
    return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
};