import React from 'react'
import { useSelector } from 'react-redux';

export const Navbar = ({setShowSidebar, showSidebar}) => {

    const {name} = useSelector(state => state.auth);

    const onClick = () => {
        setShowSidebar(true);
    }

    return (
        <>
            <div className='navigation__navbar'>
                {
                    (!showSidebar) &&
                        <div className='navigation__navbar-show-btn' onClick={onClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-align-left" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="4" y1="12" x2="14" y2="12" />
                                <line x1="4" y1="18" x2="18" y2="18" />
                            </svg>
                        </div>
                }
                <div className='navigation__navbar-user-info'>
                    <p>{name}</p>
                    <div className='navigation__navbar-circol'>{name.slice(0, 1).toUpperCase()}</div>
                </div>
            </div>
        </>
    )
}
