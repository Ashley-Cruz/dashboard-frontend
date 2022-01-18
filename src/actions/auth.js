import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from './../types/types';
import { useSocket } from './../hooks/useSocket';
import { useContext } from 'react';
import { SocketContext } from './../context/SocketContext';
import { clientLogout, clientsLoaded } from "./client";


export const startLogin = (data) => {
    
    
    return async(dispatch) => {
        
        // const {socket} = useContext(SocketContext);
        try {
            const resp = await fetchSinToken('login', data, 'POST');
            const body = await resp.json();

            if(body.ok){
                localStorage.setItem('token', body.data.token);

                const {uid, name} = body.data;
                
                // socket.emit('list-clients', null, (data) => {
                //     console.log('listado de clientes - escuchando')
                //     dispatch(clientsLoaded(data.data));
                // })

                dispatch(login({
                    uid,
                    name
                }));

            }else {
                //TODO: poner modal
                console.log('error 1');
            }
        } catch (error) {
            //TODO: poner modal
            console.log(error);
        }
    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {
    return (dispatch) => {

        localStorage.removeItem('token');

        dispatch(logout());
        dispatch(clientLogout());
    }
}

const logout = () => ({
    type: types.authLogout
})

export const startSignup = (data) => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchSinToken('signup', data, 'POST');
            const body = await resp.json();

            if(body.ok){
                localStorage.setItem('token', body.data.token);

                const {uid, name} = body.data;
                dispatch(login({
                    uid,
                    name
                }));
            }else{
                //TODO: poner el modal
            }
        } catch (error) {
            //TODO: poner el modal
            console.log(error);
        }
    }
}

export const StartChecking = () => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken('renew');
            const body = await resp.json();

            if(body.ok){
                localStorage.setItem('token', body.data.token);

                const {uid, name} = body.data;
                dispatch(login({
                    uid,
                    name
                }))
            }

        } catch (error) {
            //TODO: poner el modal
            console.log(error);
        }
    }
}