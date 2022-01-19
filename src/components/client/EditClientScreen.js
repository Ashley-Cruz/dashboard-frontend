import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Chip from '../../assets/icons/chip.png';
import { SocketContext } from './../../context/SocketContext';
import { useHistory } from 'react-router-dom';
import { loadingAlert } from './../../actions/alert';

const initialState = {
    email: '',
    number: 0,
    firstName: '',
    secondName: '',
    fathersLastName: '',
    motherslastName: '',
    birthDate: '',
    status: '',
    analyst: '',
}

export const EditClientScreen = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const {socket} = useContext(SocketContext);
    const {activeClient} = useSelector(state => state.client);
    const [formValues, setFormValues] = useState(initialState);
    const {email, number, firstName, secondName, fathersLastName, motherslastName, birthDate, status, analyst} = formValues;
    
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorNumber, setErrorNumber] = useState(false);
    const [errorNames, setErrorNames] = useState(false);
    const [errorBirthDate, setErrorBirthDate] = useState(false);

    useEffect(() => {
        const {email, number, firstName, secondName, fathersLastName, motherslastName, birthDate: birthDateComplete, status, analyst} = activeClient;
        const birthDate = birthDateComplete.slice(0, 10);
        setFormValues({email, number, firstName, secondName, fathersLastName, motherslastName, birthDate, status, analyst});
    }, [])

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const onClick = () => {

        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(email.length < 1 || !emailRegex.test(email)){
            setErrorEmail(true);
            setTimeout(() => {
                setErrorEmail(false);
            }, 4000);
            console.log('error')
            return;
        }else if(number.toString().length !== 10){
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

        socket.emit('update-client', {
            email,
            number,
            firstName,
            secondName,
            fathersLastName,
            motherslastName,
            birthDate,
            status,
            analyst,
            id: activeClient.id
        })
        
        dispatch(loadingAlert());
    }

    return (
        <div className='client__background'>
            <div className='client__top'>
                <h2>Editar cliente</h2>
            </div>
            <span></span>
            <div className='client__body'>
                <p className='client__body-p'>Datos del cliente</p>
                <form className='client__form'>
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
                </form>
                <div>
                    <p className='client__body-p'>Datos de la tarjeta</p>
                    <div className='client__card-container'>
                        <div className='client__card'>
                            <div className='client__card-imgs'>
                                <img src={Chip} alt='Chip' />
                                <img src='https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png' alt='type' />
                            </div>
                            <div className='client__card-number'>
                                <p>{activeClient.card.cardNumber}</p>
                            </div>
                            <div className='client__card-info-container'>
                                <div>
                                    <p className='client__card-info-subtitle'>Card Holder</p>
                                    <p>{`${firstName} ${fathersLastName}`}</p>
                                </div>
                                <div>
                                    <p className='client__card-info-subtitle'>Expires</p>
                                    <p>{activeClient.card.expirationDate.slice(0,7)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='client__form-div-button'>
                        <button type='submit' onClick={onClick}>Guardar cambios</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
