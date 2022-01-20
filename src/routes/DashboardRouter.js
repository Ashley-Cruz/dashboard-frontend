import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DashboardScreen } from './../components/dashboard/DashboardScreen';
import { Navbar } from '../components/navigation/Navbar';
import { Sidebar } from '../components/navigation/Sidebar';
import { NewClientScreen } from './../components/client/NewClientScreen';
import { useDispatch } from 'react-redux';
import { SocketContext } from './../context/SocketContext';
import { clientsLoaded } from '../actions/client';
import { ClientsScreen } from './../components/client/ClientsScreen';
import { EditClientScreen } from './../components/client/EditClientScreen';

export const DashboardRouter = () => {

    const dispatch = useDispatch();
    const {socket} = useContext(SocketContext);
    const [showSidebar, setShowSidebar] = useState(false);
    
    return (
        <div className='base__background'>
            {
                (showSidebar) &&
                    <div className='base__sidebar'>
                        <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>
                    </div>
            }
            <div className='base__body-container'>
                <div className='base__navbar'>
                    <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>
                </div>
                <div className='base__body'>
                    <Switch>
                        <Route exact path="/dashboard" component={DashboardScreen} />
                        <Route exact path="/clients" component={ClientsScreen} />
                        <Route exact path="/newclient" component={NewClientScreen} />
                        <Route exact path="/editclient" component={EditClientScreen} />

                        <Redirect to="/dashboard" />
                    </Switch>
                </div>
            </div>
        </div>
    )
}
