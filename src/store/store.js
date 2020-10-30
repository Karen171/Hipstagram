import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import userReducer from "./users/reducer";
import { initThunk } from './users/thunks';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    users: userReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); 

store.dispatch(initThunk())

export default store