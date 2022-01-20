import React from 'react';

import Error from '../../assets/icons/error.png';
import Success from '../../assets/icons/check.png';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeAlert } from './../../actions/alert';

export const Alert = () => {

    const {loading, alert} = useSelector(state => state.alert);
    const history = useHistory();
    const dispatch = useDispatch();

    const onClick = () => {
        history.replace(alert.route || '/clients');
        dispatch(removeAlert())
    }

    return (
        <div className='popup__background'>
            <div className='popup__form-container'>
                {
                    (loading) 
                        ? <div className="loading"></div> 
                        : (alert.ok)
                            ? 
                                <>
                                    <img src={Success} alt='Icon' />
                                    <span></span>
                                    <h4>¡Genial!</h4>
                                    <p>{alert.text}</p>
                                    <button onClick={onClick}>OK</button>
                                </>
                            :
                                <>
                                    <img src={Error} alt='Icon' />
                                    <span></span>
                                    <h4>Error</h4>
                                    <p>{alert.text}</p>
                                    <button onClick={onClick}>OK</button>
                                </>
                }
            </div>
        </div>
    )
}
