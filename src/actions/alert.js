import { types } from './../types/types';

export const loadingAlert = () => ({
    type: types.alertLoading
})

export const finalAlert = (payload) => ({
    type: types.alertFinal,
    payload
})

export const removeAlert = () => ({
    type: types.alertRemove
})