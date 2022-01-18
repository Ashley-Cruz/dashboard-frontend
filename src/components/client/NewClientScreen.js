import React, { useContext, useState } from 'react'
import { fetchCardGenerator } from '../../helpers/fetch';
import { useForm } from './../../hooks/useForm';
import { useHistory } from 'react-router-dom';

import { SocketContext } from './../../context/SocketContext';
import Chip from '../../assets/icons/chip.png';

export const NewClientScreen = () => {

    const {socket} = useContext(SocketContext);
    const history = useHistory();

    const [valuesClient, handleInputChange] = useForm({
        email: '',
        number: 0,
        firstName: '',
        secondName: '',
        fathersLastName: '',
        motherslastName: '',
        birthDate: '',
        status: '',
        analyst: '',
    });
    const {email, number, firstName, secondName, fathersLastName, motherslastName, birthDate, status, analyst} = valuesClient;

    const [card, setCard] = useState({
        cardNumber: '',
        type: '',
        cvv: '',
        pin: '',
        expirationDate: ''
    });
    const {cardNumber, type, cvv, pin, expirationDate} = card;
    const [cardGenerated, setCardGenerated] = useState(false);

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorNumber, setErrorNumber] = useState(false);
    const [errorNames, setErrorNames] = useState(false);
    const [errorBirthDate, setErrorBirthDate] = useState(false);

    const onSubmit = async(e) => {
        e.preventDefault();

        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(email.length < 1 || !emailRegex.test(email)){
            setErrorEmail(true);
            setTimeout(() => {
                setErrorEmail(false);
            }, 4000);
            console.log('error')
            return;
        }else if(number.length !== 10){
            setErrorNumber(true);
            setTimeout(() => {
                setErrorNumber(false);
            }, 4000);
            console.log('error')
            return;
        }else if(firstName.trim().length < 1 || fathersLastName.trim().length < 1 || motherslastName.trim().length < 1 || analyst === '' || status === ''){
            setErrorNames(true);
            setTimeout(() => {
                setErrorNames(false);
            }, 4000);
            console.log('error')
            return;
        }else if(birthDate === ''){
            setErrorBirthDate(true);
            setTimeout(() => {
                setErrorBirthDate(false);
            }, 4000);
            console.log('error')
            return;
        }

        const resp = await fetchCardGenerator();
        const body = await resp.json();
        const {type, date, cardNumber, cvv, pin} = body;
        setCard({
            cardNumber,
            type,
            cvv,
            pin,
            expirationDate: date
        });
        setCardGenerated(true);
    }

    const onClick = () => {
        socket.emit('create-client', {
            email,
            number,
            firstName,
            secondName,
            fathersLastName,
            motherslastName,
            birthDate,
            status,
            analyst,
            cardNumber,
            type,
            cvv,
            pin,
            expirationDate
        })

        history.replace('/dashboard');
    }

    return (
        <div className='client__background'>
            <div className='client__top'>
                <h2>Crear cliente</h2>
            </div>
            <span></span>
            <div className='client__body'>
                <p className='client__body-p'>Datos del cliente</p>
                <form className={`client__form ${cardGenerated && 'disabled'}`} onSubmit={onSubmit}>
                    <div className="client__form-div">
                        <label>Nombre</label>
                        <input type='text' autoComplete='off' name='firstName' value={firstName} onChange={handleInputChange} />
                    </div>
                    <div className="client__form-div">
                        <label>Segundo nombre</label>
                        <input type='text' autoComplete='off' name='secondName' value={secondName} onChange={handleInputChange} />
                    </div>
                    <div className="client__form-div">
                        <label>Apellido paterno</label>
                        <input type='text' autoComplete='off' name='fathersLastName' value={fathersLastName} onChange={handleInputChange} />
                    </div>
                    <div className="client__form-div">
                        <label>Apellido materno</label>
                        <input type='text' autoComplete='off' name='motherslastName' value={motherslastName} onChange={handleInputChange} />
                    </div>
                    <div className="client__form-div">
                        <label>Fecha de nacimiento</label>
                        <input type='date' autoComplete='off' name='birthDate' value={birthDate} onChange={handleInputChange} />
                    </div>
                    <div className="client__form-div">
                        <label>Email</label>
                        <input type='email' autoComplete='off' name='email' value={email} onChange={handleInputChange} />
                    </div>
                    <div className="client__form-div">
                        <label>Teléfono</label>
                        <input type='number' autoComplete='off' name='number' value={number} onChange={handleInputChange} />
                    </div>
                    <div className="client__form-div">
                        <label>Estatus</label>
                        <select name='status' value={status} onChange={handleInputChange}>
                            <option value='' disabled>- Seleccione -</option>
                            <option value='PENDIENTE'>Pendiente</option>
                            <option value='EN PROCESO'>En proceso</option>
                            <option value='COMPLETADO'>Completado</option>
                        </select>
                    </div>
                    <div className="client__form-div">
                        <label>Analista asignado</label>
                        <input type='text' autoComplete='off' name='analyst' value={analyst} onChange={handleInputChange} />
                    </div>
                    {
                        (!cardGenerated) &&
                            <div className='client__form-div-button'>
                                <button type='submit'>Crear tarjeta</button>
                            </div>
                    }
                </form>
                {
                    (cardGenerated) &&
                        <div>
                            <p className='client__body-p'>Datos de la tarjeta</p>
                            <div className='client__card-container'>
                                <div className='client__card'>
                                    <div className='client__card-imgs'>
                                        <img src={Chip} alt='Chip' />
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png' alt='type' />
                                    </div>
                                    <div className='client__card-number'>
                                        <p>{cardNumber}</p>
                                    </div>
                                    <div className='client__card-info-container'>
                                        <div>
                                            <p className='client__card-info-subtitle'>Card Holder</p>
                                            <p>{`${firstName} ${fathersLastName}`}</p>
                                        </div>
                                        <div>
                                            <p className='client__card-info-subtitle'>Expires</p>
                                            <p>{expirationDate.slice(0,7)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='client__form-div-button'>
                                <button type='submit' onClick={onClick}>Guardar</button>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
