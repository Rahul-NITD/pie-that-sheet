import React from 'react';
import "./Navbar.css"
import logo from "../../assets/logo.png"
import optionsIcon from "../../assets/side-icon.png"

const Navbar = ({setShowMenu}) => {
    return (
        <div className='navbar'>
            <div className="nav-items"></div>
            <div className="nav-items">
                <img src={logo} alt="logo" />
            </div>
            <div className="nav-items edit">
                <img onClick={e => setShowMenu(prev => !prev)} src={optionsIcon} alt="edit icon" />
            </div>
        </div>
    );
}

export default Navbar;
