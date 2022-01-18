import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startSignup } from '../../actions/auth';

import Logo from '../../assets/ColorLogo.png';
import Alerta from '../../assets/icons/exclamacion.png';
import { useForm } from './../../hooks/useForm';

export const SignupScreen = () => {

    const dispatch = useDispatch();

    const [values, handleInputChange] = useForm({
        name: '',
        email: '',
        password: ''
    });
    const {name, email, password} = values;

    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if(name.trim().length < 1){
            setErrorName(true);
            setTimeout(() => {
                setErrorName(false);
            }, 4000);
            return;
        }else if(email.trim().length < 1 || !emailRegex.test(email)){
            setErrorEmail(true);
            setTimeout(() => {
                setErrorEmail(false);
            }, 4000);
            return;
        }else if(password.trim().length < 6){
            setErrorPassword(true);
            setTimeout(() => {
                setErrorPassword(false);
            }, 4000);
            return;
        }

        dispatch(startSignup({
            name: name.trim(),
            email: email.trim(),
            password: password.trim()
        }))
    }

    return (
        <div className='auth__background auth__background-create-acount'>
            <div className='auth__extra-container'></div>
            <div className='auth__container'>
                <form className='auth__container-form' onSubmit={onSubmit}>
                    <h1>Crear Cuenta</h1>
                    <div className='auth__div-form'>
                        <label>Nombre:</label>
                        <input type="text" name='name' value={name} onChange={handleInputChange} autoComplete='off'/>
                    </div>
                    <div className='auth__div-form'>
                        <label>Email:</label>
                        <input type="email" name='email' value={email} onChange={handleInputChange} autoComplete='off'/>
                    </div>
                    <div className='auth__div-form'>
                        <label>Contraseña:</label>
                        <input type="password" name='password' value={password} onChange={handleInputChange} autoComplete='off'/>
                    </div>
                    {
                        (errorName) && <div className="auth_err-form-container"><p className="auth_err-form"><span>Error</span><br/>El <span>nombre</span> es necesario.</p><img src={Alerta} alt="Alerta"/></div>
                    }
                    {
                        (errorEmail) && <div className="auth_err-form-container"><p className="auth_err-form"><span>Error</span><br/>Parece que el <span>email</span> no tiene un formato válido.</p><img src={Alerta} alt="Alerta"/></div>
                    }
                    {
                        (errorPassword) && <div className="auth_err-form-container"><p className="auth_err-form"><span>Error</span><br/>La <span>contraseña</span> debe tener al menos 6 caracteres.</p><img src={Alerta} alt="Alerta"/></div>
                    }
                    <div className='auth__div-form'>
                        <button type="submit">Ingresar</button>
                    </div>
                    <div className='auth__div-form'>
                        <p>¿Ya tienes una cuenta? <Link to='/auth/login' className='auth__create-acount'>Iniciar Sesión</Link> </p>
                    </div>
                </form>
                <div className='auth__container-img'>
                    <img src={Logo} alt='Logo de atrato' />
                </div>
            </div>
        </div>
    )
}
