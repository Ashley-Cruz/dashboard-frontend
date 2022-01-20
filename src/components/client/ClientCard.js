import React, { useContext, useState } from 'react';
import User from '../../assets/icons/profile-user.png';
import { useDispatch, useSelector } from 'react-redux';
import { clientActive } from './../../actions/client';
import { useHistory } from 'react-router-dom';
import { SocketContext } from './../../context/SocketContext';
import { AlertOptions } from '../popup/AlertOptions';
import { loadingAlert } from './../../actions/alert';

export const ClientCard = ({client}) => {

    const dispatch = useDispatch();
    const {users} = useSelector(state => state.user)
    const {socket} = useContext(SocketContext);
    const history = useHistory();
    const [deleteUser, setDeleteUser] = useState(false);

    const handleEdit = () => {
        dispatch(clientActive(client));
        history.replace('/editclient');
    }

    const handleClickDelete = () => {
        socket.emit('delete-client', client.id);
        dispatch(loadingAlert());
    }

    return (
        <>
            {
                (deleteUser) &&
                    <AlertOptions title='¿Quieres eliminarlo?' setStatus={setDeleteUser} handleClick={handleClickDelete}/>
            }
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
                                <p>{users.find(user => user.uid === client.analyst).name}</p>
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
                        <p className={`${client.status === 'COMPLETADO' ? 'completed' : client.status === 'EN PROCESO' ? 'in-progress' : 'pending'}`}>{client.status}</p>
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
                    <p onClick={() => setDeleteUser(true)}>Eliminar</p>
                </div>
            </div>
        </>
    )
}
