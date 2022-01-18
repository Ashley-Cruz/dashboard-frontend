import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { DashboardRouter } from './DashboardRouter';
import { StartChecking } from '../actions/auth';
import { Alert } from '../components/popup/Alert';

export const AppRouter = () => {

    const {uid, checking} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(StartChecking());
    }, [])

    // if(checking){
    //     //TODO: poner el diseño del otro
    //     return <h1>Espere</h1>
    // }

    return (
        <>
            {/* <Alert /> */}
            <Router>
                <div>
                    <Switch>
                        <PublicRoute path="/auth" component={AuthRouter} isAuthenticated={!!uid} />
                        <PrivateRoute path="/" component={DashboardRouter} isAuthenticated={!!uid} />

                        <Redirect to="/auth" />
                    </Switch>
                </div>
            </Router>
        </>
    )
}
