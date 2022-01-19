import { combineReducers } from "redux";
import { authReducer } from './authReducer';
import { clientReducer } from './clientReducer';
import { alertReducer } from './alertReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    client: clientReducer,
    alert: alertReducer,
    user: userReducer
})