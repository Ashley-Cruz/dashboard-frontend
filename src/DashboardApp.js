import React from 'react'
import { Provider } from 'react-redux'
import { SocketProvider } from './context/SocketContext';
import { AppRouter } from './routes/AppRouter';
import { store } from './store/store';

export const DashboardApp = () => {
    return (
        <Provider store={store}>
            <SocketProvider>
                <AppRouter />
            </SocketProvider>
        </Provider>
    )
}
