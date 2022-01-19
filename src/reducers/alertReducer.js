import { types } from './../types/types';

const initialState = {
    loading: false,
    alert: null,
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
    
        default:
            return state;
    }
}
