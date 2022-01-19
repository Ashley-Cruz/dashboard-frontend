import React from 'react';
import Question from '../../assets/icons/pregunta.png';

export const AlertOptions = ({title, setStatus, handleClick}) => {
    return (
        <div className='popup__background'>
            <div className='popup__form-container'>
                <img src={Question} alt='Icon' />
                <span></span>
                <h4>{title}</h4>
                <p>Selecciona una opción</p>
                <div className='popup__form-buttons'>
                    <button onClick={() => setStatus(false)}>Cancelar</button>
                    <button onClick={handleClick}>Sí</button>
                </div>
            </div>
        </div>
    )
}
