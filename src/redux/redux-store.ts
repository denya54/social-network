import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk'

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    usersPage: usersReducer,
    auth: authReducer,
    // sidebar: sidebarReducer
});
export type StateType = ReturnType<typeof reducers>
export type StoreType = typeof store

let store = createStore(reducers, applyMiddleware(thunkMiddleware));


// @ts-ignore
window.store = store

export default store;
