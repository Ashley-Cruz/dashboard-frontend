import { types } from './../types/types';

const initialState = {
    users: []
}

export const userReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case types.userList:
            return {
                ...state,
                users: action.payload
            }
    
        default:
            return state;
    }
}