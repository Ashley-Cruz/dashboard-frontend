import { fetchConToken } from "../helpers/fetch";
import { types } from './../types/types';


export const startLoadingClients = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken('client/list');
            const body = await resp.json();
            const {data} = body;
            if(body.ok){
                dispatch(clientsLoaded(data))
            }

        } catch (error) {
            //TODO: poner modal
            console.log(error);
        }
    }
}

export const clientsLoaded = (clients) => ({
    type: types.clientList,
    payload: clients
})

export const clientLogout = () => ({
    type: types.clientLogout
})