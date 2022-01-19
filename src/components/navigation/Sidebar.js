import React, { useState } from 'react';
import Logo from '../../assets/ColorLogo.png';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { AlertOptions } from '../popup/AlertOptions';

export const Sidebar = () => {

    const dispatch = useDispatch();
    const [logout, setLogout] = useState(false);

    const handleClickLogout = () => {
        dispatch(startLogout());
    }

    return (
        <>
            {
                (logout) && 
                    <AlertOptions title='¿Quieres cerrar sesión?' setStatus={setLogout} handleClick={handleClickLogout} />
            }
            <div className='navigation__sidebar-container'>
                <div className='navigation__sidebar-top'>
                    <img src={Logo} alt='Icon de atrato' />
                </div>
                <div className='navigation__sidebar-body'>
                    <div>
                        <p className='navigation__sidebar-subtitle'>Páginas</p>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-adjustments" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="6" cy="10" r="2" />
                            <line x1="6" y1="4" x2="6" y2="8" />
                            <line x1="6" y1="12" x2="6" y2="20" />
                            <circle cx="12" cy="16" r="2" />
                            <line x1="12" y1="4" x2="12" y2="14" />
                            <line x1="12" y1="18" x2="12" y2="20" />
                            <circle cx="18" cy="7" r="2" />
                            <line x1="18" y1="4" x2="18" y2="5" />
                            <line x1="18" y1="9" x2="18" y2="20" />
                        </svg>
                        <Link to='/dashboard' className='navigation__sidebar-link'>Dashboard</Link>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="9" cy="7" r="4" />
                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                        </svg>
                        <Link to='/clients' className='navigation__sidebar-link'>Listado de clientes</Link>
                    </div>
                    <span></span>
                    <div>
                        <p className='navigation__sidebar-subtitle'>Otros</p>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-bar-to-right" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <line x1="14" y1="12" x2="4" y2="12" />
                            <line x1="14" y1="12" x2="10" y2="16" />
                            <line x1="14" y1="12" x2="10" y2="8" />
                            <line x1="20" y1="4" x2="20" y2="20" />
                        </svg>
                        <p className='navigation__sidebar-link' onClick={() => setLogout(true)}>Cerrar sesión</p>
                    </div>
                </div>
            </div>
        </>
    )
}
