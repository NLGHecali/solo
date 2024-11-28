import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();
        api.post('/login', { username, password })
            .then((response) => {
                const { role } = response.data;
                sessionStorage.setItem('role', role);
                sessionStorage.setItem('username', username);

                if (role === 'gestor') navigate('/menu-manager');
                else if (role === 'consumidor') navigate('/menu');
                else if (role === 'cozinha') navigate('/kitchen');
            })
            .catch(() => alert('Login falhou.'));
    }

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Entrar</button>
        </form>
    );
}
