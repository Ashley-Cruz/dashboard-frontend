import { types } from './../types/types';

const initialState = {
    loading: false,
    alert: {
        ok: false
    },
    status: false
}

export const alertReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case types.alertLoading:
            return {
                ...state,
                loading: true,
                status: true
            }
        
        case types.alertFinal:
            return {
                ...state,
                loading: false,
                alert: action.payload
            }

        case types.alertRemove:
            return {
                ...initialState
            }

        case types.alertChangeStatus:
            return {
                ...state,
                status: action.payload
            }
    
        default:
            return state;
    }
}
