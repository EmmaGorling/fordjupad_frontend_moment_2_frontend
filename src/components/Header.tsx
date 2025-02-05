import React from 'react'
import './Header.css';
import logo from '../assets/logo.png';


const Header = () => {
    return (
        <header>
            <img src={logo} alt="Logotyp" />
        </header>
    )
}

export default Header