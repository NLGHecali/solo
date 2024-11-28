import React, { useState } from 'react';
import api from '../api';

export function MenuManager() {
    const [entradas, setEntradas] = useState('');
    const [pratoPrincipal, setPratoPrincipal] = useState('');
    const [sobremesas, setSobremesas] = useState('');

    function handleMenuSubmit(event) {
        event.preventDefault();
        api.post('/menu', {
            role: 'gestor',
            entradas: entradas.split(','),
            pratoPrincipal: pratoPrincipal.split(','),
            sobremesas: sobremesas.split(','),
        })
            .then(() => alert('Menu atualizado com sucesso!'))
            .catch(() => alert('Erro ao atualizar menu.'));
    }

    return (
        <form onSubmit={handleMenuSubmit}>
            <h2>Gerenciar Menu</h2>
            <textarea
                placeholder="Entradas (separadas por vírgulas)"
                value={entradas}
                onChange={(e) => setEntradas(e.target.value)}
            />
            <textarea
                placeholder="Pratos Principais (separados por vírgulas)"
                value={pratoPrincipal}
                onChange={(e) => setPratoPrincipal(e.target.value)}
            />
            <textarea
                placeholder="Sobremesas (separadas por vírgulas)"
                value={sobremesas}
                onChange={(e) => setSobremesas(e.target.value)}
            />
            <button type="submit">Atualizar Menu</button>
        </form>
    );
}
