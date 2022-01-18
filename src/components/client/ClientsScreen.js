import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClientCard } from './ClientCard';

export const ClientsScreen = () => {

    const {clients} = useSelector(state => state.client)

    return (
        <div className='card__background'>
            <div className='card__top'>
                <h2>Listado de clientes</h2>
                <div>
                    <Link to='/newclient' className='card__link-newclient'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Crear nuevo cliente
                    </Link>
                </div>
            </div>
            <span></span>
            <div className='card__body'>
                {
                    clients.map((client => (
                        <ClientCard key={client.id} client={client} />
                    )))
                }
            </div>
        </div>
    )
}
