import React from 'react'
import { useSelector } from 'react-redux';

export const Navbar = () => {

    const {name} = useSelector(state => state.auth);

    const handleClick = () => {
        console.log('HOLA')
    }

    return (
        <>
            <div className='navigation__navbar'>
                <p>{name}</p>
                <div className='navigation__navbar-circol' onFocus={handleClick}>{name.slice(0, 1).toUpperCase()}</div>
            </div>
        </>
    )
}
