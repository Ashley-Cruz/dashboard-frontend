import { fetchConToken } from "../helpers/fetch";
import { types } from './../types/types';

export const clientsLoaded = (clients) => ({
    type: types.clientList,
    payload: clients
})

export const clientLogout = () => ({
    type: types.clientLogout
})

export const clientActive = (client) => ({
    type: types.clientActive,
    payload: client
})