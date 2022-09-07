
import '../../styles/components/layout/Header.css';
import React from 'react';
import '../../styles/components/layout/Nav.css';

import { NavLink } from "react-router-dom";

const Nav = (props) => {
    return (

        <nav>
            <div>
                <ul>
                    <li><NavLink to="/" className={({IsActive}) => IsActive ? "Activo" : undefined }>Home</NavLink></li>
                    <li><NavLink to="/Nosotros" className={({IsActive}) => IsActive ? "Activo" : undefined }>Nosotros</NavLink></li>
                    <li><NavLink to="/Servicios" className={({IsActive}) => IsActive ? "Activo" : undefined }>Servicios</NavLink></li>
                    <li><NavLink to="/Contacto" className={({IsActive}) => IsActive ? "Activo" : undefined }>Contacto</NavLink></li>
                </ul>
            </div>

        </nav>

    );
}
export default Nav;
