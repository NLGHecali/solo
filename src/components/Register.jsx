import React, { useState } from 'react';
import api from '../api';

export function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [erro, setErro] = useState(''); // Para capturar erros de registo

console.log(1);

    async function handleSubmit(event) {
        event.preventDefault(); // Impede o comportamento padrão do submit
        console.log(2);
        // Verificação básica se os campos estão preenchidos
        if (!username || !password || !role) {
            setErro('Por favor, preencha todos os campos!');
            return;
        }
            
        const resposta = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    role: role,
                }),
            });
    
            if (!resposta.ok) {
                throw new Error('Erro ao registar utilizador.');
            }
    
            const dados = await resposta.json();
    
            if (dados.success) {
                alert('Utilizador registado com sucesso!');
            } else {
                setErro('Erro ao registar utilizador.');
            }
        
            console.error(erro);
            setErro(erro.message || 'Erro ao registar utilizador.');
        
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Registo</h2>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome de Utilizador:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Função:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Escolha uma função</option>
                        <option value="gestor">Gestor</option>
                        <option value="consumidor">Consumidor</option>
                        <option value="cozinha">Cozinha</option>
                    </select>
                </div>
                <button type="submit">Registar</button>
            </form>
        </div>
    );
}

