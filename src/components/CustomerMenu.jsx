import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function CustomerMenu() {
    const [menu, setMenu] = useState({ entradas: [], pratoPrincipal: [], sobremesas: [] });
    const [order, setOrder] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    // Função para buscar o menu na API
    useEffect(() => {
        async function fetchMenu() {
            try {
                const response = await axios.get('http://localhost:3000/menu');
                setMenu(response.data);
            } catch (error) {
                console.error('Erro ao buscar o menu:', error);
            }
        }

        fetchMenu();
    }, []);

    // Função para adicionar itens ao pedido
    function addToOrder(item) {
        setOrder((prevOrder) => [...prevOrder, item]);
    }

    // Função para enviar o pedido
    async function submitOrder() {
        try {
            await axios.post('http://localhost:3000/orders', {
                items: order,
                customerName: 'Cliente Exemplo', // Você pode substituir por um valor dinâmico
            });
            setOrder([]); // Limpa o pedido
            setSuccessMessage('Pedido enviado com sucesso!');
            setTimeout(() => setSuccessMessage(''), 3000); // Remove a mensagem após 3 segundos
        } catch (error) {
            console.error('Erro ao enviar o pedido:', error);
        }
    }

    return (
        <div>
            <h1>Menu do Restaurante</h1>

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <div>
                <h2>Entradas</h2>
                <ul>
                    {menu.entradas.map((entrada, index) => (
                        <li key={index}>
                            {entrada} <button onClick={() => addToOrder(entrada)}>Adicionar</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Pratos Principais</h2>
                <ul>
                    {menu.pratoPrincipal.map((prato, index) => (
                        <li key={index}>
                            {prato} <button onClick={() => addToOrder(prato)}>Adicionar</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Sobremesas</h2>
                <ul>
                    {menu.sobremesas.map((sobremesa, index) => (
                        <li key={index}>
                            {sobremesa} <button onClick={() => addToOrder(sobremesa)}>Adicionar</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Seu Pedido</h2>
                {order.length > 0 ? (
                    <ul>
                        {order.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum item no pedido</p>
                )}
                {order.length > 0 && <button onClick={submitOrder}>Enviar Pedido</button>}
            </div>
        </div>
    );
}
