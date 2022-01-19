import { types } from './../types/types';

const initialState = {
    clients: [],
    activeClient: null
}

export const clientReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case types.clientList:
            return {
                ...state,
                clients: action.payload
            }

        case types.clientLogout:
            return {
                ...initialState
            }

        case types.clientActive:
            return {
                ...state,
                activeClient: action.payload
            }
    
        default:
            return state;
    }
}