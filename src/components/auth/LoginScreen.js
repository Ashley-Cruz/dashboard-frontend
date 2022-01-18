import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '../../assets/ColorLogo.png';
import Alerta from '../../assets/icons/exclamacion.png';
import { useForm } from './../../hooks/useForm';
import { startLogin } from './../../actions/auth';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [values, handleInputChange] = useForm({
        email: '',
        password: ''
    });
    const {email, password} = values;

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if(email.length < 1 || !emailRegex.test(email)){
            setErrorEmail(true);
            setTimeout(() => {
                setErrorEmail(false);
            }, 4000);
            return;
        }else if(password.length < 1){
            setErrorPassword(true);
            setTimeout(() => {
                setErrorPassword(false);
            }, 4000);
            return;
        }

        dispatch(startLogin(values));
    }

    return (
        <div className='auth__background'>
            <div className='auth__extra-container'></div>
            <div className='auth__container'>
                <form className='auth__container-form' onSubmit={onSubmit}>
                    <h1>Iniciar Sesión</h1>
                    <div className='auth__div-form'>
                        <label>Email:</label>
                        <input type="email" value={email} name='email' onChange={handleInputChange} autoComplete='off'/>
                    </div>
                    <div className='auth__div-form'>
                        <label>Contraseña:</label>
                        <input type="password" value={password} name='password' onChange={handleInputChange} autoComplete='off'/>
                    </div>
                    {
                        (errorEmail) && <div className="auth_err-form-container"><p className="auth_err-form"><span>Error</span><br/>Parece que el <span>email</span> no tiene un formato válido.</p><img src={Alerta} alt="Alerta"/></div>
                    }
                    {
                        (errorPassword) && <div className="auth_err-form-container"><p className="auth_err-form"><span>Error</span><br/>La <span>contraseña</span> es necesaria.</p><img src={Alerta} alt="Alerta"/></div>
                    }
                    <div className='auth__div-form'>
                        <button type="submit">Ingresar</button>
                    </div>
                    <div className='auth__div-form'>
                        <p>¿No tienes una cuenta? <Link to='/auth/signup' className='auth__create-acount'>Crear una cuenta</Link> </p>
                    </div>
                </form>
                <div className='auth__container-img'>
                    <img src={Logo} alt='Logo de atrato' />
                </div>
            </div>
        </div>
    )
}
