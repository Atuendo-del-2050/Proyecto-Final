import '../../styles/components/layout/Header.css';
import React from 'react';

const Header = (props) => {
    return (
        <header>
            <div className="holder">
            <img src="img/Logo.jpg" width="15%" height="20%" alt="Novia" />
                    <h1>Glam Novias</h1>
                    <h6> Todo lo que has soñado,lo encuentras aquí...</h6>
            </div>
        </header>
    )
}
export default Header;