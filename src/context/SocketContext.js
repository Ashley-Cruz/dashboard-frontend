import React, { useEffect, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clientsLoaded } from '../actions/client';
import { useSocket } from '../hooks/useSocket';
import { types } from './../types/types';
import { clientLogout } from './../actions/client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const dispatch = useDispatch();
    // const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    const { socket, online, conectarSocket, desconectarSocket } = useSocket(process.env.REACT_APP_SOCKET_URL);
    const {logged} = useSelector(state => state.auth);

    useEffect(() => {
        if(logged){
            conectarSocket()
        }
    }, [logged, conectarSocket])

    useEffect(() => {
        if(!logged){
            desconectarSocket()
        }
    }, [logged, desconectarSocket])
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}