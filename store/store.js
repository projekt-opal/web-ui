import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'


const rootReducer = combineReducers({
});


export const initStore = (initialState) => {
    return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
};