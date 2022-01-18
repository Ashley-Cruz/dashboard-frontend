import React from 'react';

import Error from '../../assets/icons/error.png';
import Success from '../../assets/icons/check.png';

export const Alert = () => {
    return (
        <div className='popup__background'>
            <div className='popup__form-container'>
                <img src={Error} alt='Icon' />
                <span></span>
                <h4>Error</h4>
                <p>Parece que algo salió mal</p>
                <button>OK</button>
            </div>
        </div>
    )
}
