import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { clientsLoaded } from '../../actions/client'
import { SocketContext } from './../../context/SocketContext';

export const DashboardScreen = () => {

    const dispatch = useDispatch();
    const {socket} = useContext(SocketContext);

    // useEffect(() => {
    //     socket.on('list-clients', (data) => {
    //         console.log('ruta principal')
    //         dispatch(clientsLoaded(data.data));
    //     })
    // }, [])

    return (
        <div className='card__background'>
            <div className='card__top'>
                <h2>Dashboard</h2>
            </div>
            <span></span>
            <div className='card__body'>
                
            </div>
        </div>
    )
}