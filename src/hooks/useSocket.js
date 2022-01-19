import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { clientsLoaded } from '../actions/client';
import { finalAlert, loadingAlert } from './../actions/alert';

export const useSocket = ( serverPath ) => {

    const dispatch = useDispatch();
    
    const [socket, setSocket] = useState(null);
    const [ online, setOnline ] = useState(false);

    const conectarSocket = useCallback( () => {

        const token = localStorage.getItem('token');

        const socketTemp = io.connect( serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                'x-token': token
            }
        });
        setSocket(socketTemp);
    }, [serverPath]);

    const desconectarSocket = useCallback( () => {
        socket?.disconnect();
    }, [socket]);

    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('create-client', (payload) => {
            if(payload.ok){
                return dispatch(finalAlert({
                    ok: true,
                    text: 'Cliente creado de manera exitosa'
                }))
            }

            dispatch(finalAlert({
                ok: false,
                text: 'Parce que algo salió mal'
            }))
        })
    }, [socket])

    useEffect(() => {
        socket?.on('list-clients', (payload) => {
            dispatch(clientsLoaded(payload.data));
        })
    }, [socket])

    useEffect(() => {
        socket?.on('update-client', (payload) => {
            if(payload.ok){
                return dispatch(finalAlert({
                    ok: true,
                    text: 'Cliente actualizado de manera exitosa'
                }))
            }

            dispatch(finalAlert({
                ok: false,
                text: 'Parce que algo salió mal'
            }))
        })
    }, [socket])

    useEffect(() => {
        socket?.on('delete-client', (payload) => {
            if(payload.ok){
                return dispatch(finalAlert({
                    ok: true,
                    text: 'Cliente eliminado de manera exitosa'
                }))
            }

            dispatch(finalAlert({
                ok: false,
                text: 'Parce que algo salió mal'
            }))
        })
    }, [socket])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}