import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { clientsLoaded } from '../actions/client';

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
            console.log('new');
        })
    }, [socket])

    useEffect(() => {
        socket?.on('list-clients', (payload) => {
            console.log('list');
            dispatch(clientsLoaded(payload.data));
        })
    }, [socket])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}