import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <nav style={{ backgroundColor: '#333', padding: '1rem' }}>
            <ul style={{ display: 'flex', listStyleType: 'none', justifyContent: 'space-around' }}>
                <li>
                    <Link to="/login" style={linkStyle}>Login</Link>
                </li>
                <li>
                    <Link to="/register" style={linkStyle}>Registo</Link>
                </li>
            </ul>
        </nav>
    );
}

// Estilo para os links
const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2rem',
};
