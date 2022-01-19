import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClientCard } from './ClientCard';
import { useForm } from './../../hooks/useForm';

const initialState = {
    searchStatus: '',
    searchName: '',
    searchId: ''
}

export const ClientsScreen = () => {

    const {clients} = useSelector(state => state.client);
    const [formValues, setFormValues] = useState(initialState);
    const {searchStatus, searchName, searchId} = formValues;

    const clientsFilter = useMemo( () => clients.filter(client => client.status.includes(searchStatus) && client.id.includes(searchId) && client.firstName.concat(client.secondName, client.fathersLastName, client.motherslastName).includes(searchName)))

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleFilter = () => {
        for(let i=0; i < clients.length; i++){
            console.log(clients[i]);
            let fullName = clients[i].firstName;
            fullName = fullName.concat(clients[i].secondName, clients[i].fathersLastName)
            console.log(fullName)
        }
    }
    handleFilter();

    return (
        <div className='card__background'>
            <div className='card__top'>
                <h2>Listado de clientes</h2>
                <div className='card__top-filters'>
                    <div>
                        <input type='text' autoComplete='off' placeholder='Buscar por ID' name='searchId' value={searchId} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <input type='text' autoComplete='off' placeholder='Buscar por Nombre' name='searchName' value={searchName} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <select name='searchStatus' value={searchStatus} onChange={handleInputChange}>
                            <option value=''>- Seleccione -</option>
                            <option value='PENDIENTE'>Pendiente</option>
                            <option value='EN PROCESO'>En proceso</option>
                            <option value='COMPLETADO'>Completado</option>
                        </select>
                    </div>
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
                    clientsFilter.map((client => (
                        <ClientCard key={client.id} client={client} />
                    )))
                }
            </div>
        </div>
    )
}