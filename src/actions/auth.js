import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from './../types/types';
import { useSocket } from './../hooks/useSocket';
import { useContext } from 'react';
import { SocketContext } from './../context/SocketContext';
import { clientLogout, clientsLoaded } from "./client";
import { changeStatusAlert, finalAlert } from "./alert";
import { userLogout } from "./user";


export const startLogin = (data) => {
    
    
    return async(dispatch) => {
        
        try {
            const resp = await fetchSinToken('login', data, 'POST');
            const body = await resp.json();

            if(body.ok){
                localStorage.setItem('token', body.data.token);

                const {uid, name} = body.data;

                dispatch(login({
                    uid,
                    name
                }));

            }else if(body.exist){
                dispatch(changeStatusAlert(true));
                dispatch(finalAlert({
                    ok: false,
                    text: 'El usuario es incorrecto',
                    route: '/auth/login'
                }))
            }else {
                dispatch(changeStatusAlert(true));
                dispatch(finalAlert({
                    ok: false,
                    text: 'Parece que algo salió mal',
                    route: '/auth/login'
                }))
            }
        } catch (error) {
            dispatch(changeStatusAlert(true));
            dispatch(finalAlert({
                ok: false,
                text: 'Parece que algo salió mal',
                route: '/auth/login'
            }))
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
        dispatch(userLogout());
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
            }else if(body.exist){
                dispatch(changeStatusAlert(true));
                dispatch(finalAlert({
                    ok: false,
                    text: 'Parece que el usuario ya existe',
                    route: '/auth/signup'
                }))
            }else {
                dispatch(changeStatusAlert(true));
                dispatch(finalAlert({
                    ok: false,
                    text: 'Parece que algo salió mal',
                    route: '/auth/signup'
                }))
            }
        } catch (error) {
            dispatch(changeStatusAlert(true));
            dispatch(finalAlert({
                ok: false,
                text: 'Parece que algo salió mal',
                route: '/auth/signup'
            }))
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
            dispatch(finalAlert({
                ok: false,
                text: 'Parece que algo salió mal',
                route: '/auth/login'
            }))
            dispatch(startLogout())
        }
    }
}