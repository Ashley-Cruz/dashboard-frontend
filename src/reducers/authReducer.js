import { types } from './../types/types';

const initialState = {
    name: null,
    uid: null,
    checking: true,
    logged: false
}

export const authReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false,
                logged: true
            }

        case types.authLogout:
            return {
                ...initialState,
                checking: false,
                logged: false
            }
    
        default:
            return state;
    }
}
