import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DashboardScreen } from './../components/dashboard/DashboardScreen';
import { Navbar } from '../components/navigation/Navbar';
import { Sidebar } from '../components/navigation/Sidebar';
import { NewClientScreen } from './../components/client/NewClientScreen';
import { useDispatch } from 'react-redux';
import { SocketContext } from './../context/SocketContext';
import { clientsLoaded } from '../actions/client';
import { ClientsScreen } from './../components/client/ClientsScreen';

export const DashboardRouter = () => {

    const dispatch = useDispatch();
    const {socket} = useContext(SocketContext);

    // useEffect(() => {
    //     socket.on('list-clients', (data) => {
    //         console.log('ruta principal')
    //         dispatch(clientsLoaded(data.data));
    //     })
    // }, [])
    
    return (
        <div className='base__background'>
            <div className='base__sidebar'>
                <Sidebar />
            </div>
            <div className='base__body-container'>
                <div className='base__navbar'>
                    <Navbar />
                </div>
                <div className='base__body'>
                    <Switch>
                        <Route exact path="/dashboard" component={DashboardScreen} />
                        <Route exact path="/clients" component={ClientsScreen} />
                        <Route exact path="/newclient" component={NewClientScreen} />

                        <Redirect to="/dashboard" />
                    </Switch>
                </div>
            </div>
        </div>
    )
}
