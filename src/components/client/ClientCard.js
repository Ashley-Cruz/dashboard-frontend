import React, { useState } from 'react';
import User from '../../assets/icons/profile-user.png';

export const ClientCard = ({client}) => {

    const handleEdit = () => {

    }

    const handleDelete = () => {
        
    }

    return (
        <div className='client__client-card-container'>
            <div className='client__client-card-user-container'>
                <img src={User} alt="User profile" />
            </div>
            <div className='client__client-card-info-container'>
                <div className='client__client-card-info-client'>
                    <p>{`${client.firstName} ${client.secondName} ${client.fathersLastName} ${client.motherslastName}`}</p>
                    <p>ID: {client.id}</p>
                </div>
                <div className='client__client-card-info-general'>
                    <div className='client__client-card-info-sec-one'>
                        <div className='client__client-card-info-sec-one-conatiner'>
                            <p>MAIL</p>
                            <p>{client.email}</p>
                        </div>
                        <div className='client__client-card-info-sec-one-conatiner'>
                            <p>FECHA DE NACIMIENTO</p>
                            <p>{client.birthDate.slice(0,10)}</p>
                        </div>
                        <div className='client__client-card-info-sec-one-conatiner'>
                            <p>TELÉFONO</p>
                            <p>{client.number}</p>
                        </div>
                        <div className='client__client-card-info-sec-one-conatiner'>
                            <p>ANALISTA ASIGNADO</p>
                            <p>{client.analyst}</p>
                        </div>
                    </div>
                    <div className='client__client-card-info-sec-two'>
                        <div className='client__client-card-info-sec-two-body'>
                            <div className='client__client-card-info-sec-two-conatiner'>
                                <p>FULL NAME</p>
                                <p>{`${client.firstName} ${client.secondName} ${client.fathersLastName} ${client.motherslastName}`}</p>
                            </div>
                            <div className='client__client-card-info-sec-two-conatiner'>
                                <p>CARD NUMBER</p>
                                <p>{client.card.cardNumber}</p>
                            </div>
                            <div className='client__client-card-info-sec-two-conatiner-two'>
                                <div>
                                    <p>CVV</p>
                                    <p>{client.card.cvv}</p>
                                </div>
                                <div>
                                    <p>PIN</p>
                                    <p>{client.card.pin}</p>
                                </div>
                                <div>
                                    <p>EXP</p>
                                    <p>{client.card.expirationDate.slice(0,7)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='client__client-card-info-status'>
                    <p>{client.status}</p>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dots-vertical" width="20" height="20" viewBox="0 0 24 24" strokeWidth="3" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="19" r="1" />
                <circle cx="12" cy="5" r="1" />
            </svg>
            <div className='client__client-card-options'>
                <p onClick={handleEdit}>Editar</p>
                <p onClick={handleDelete}>Eliminar</p>
            </div>
        </div>
    )
}