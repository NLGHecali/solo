import React, { useState, useEffect } from 'react';
import api from '../api';

export function KitchenOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get('/orders').then((response) => setOrders(response.data));
    }, []);

    function updateOrderStatus(index, status) {
        api.put(`/order/${index}`, { status }).then(() => {
            const updatedOrders = [...orders];
            updatedOrders[index].status = status;
            setOrders(updatedOrders);
        });
    }

    return (
        <div>
            <h2>Pedidos na Cozinha</h2>
            {orders.map((order, index) => (
                <div key={index}>
                    <p>
                        <strong>{order.username}</strong>: {order.items.join(', ')}
                    </p>
                    <button onClick={() => updateOrderStatus(index, 'em confecção')}>
                        Em Confecção
                    </button>
                    <button onClick={() => updateOrderStatus(index, 'entregue')}>
                        Entregue
                    </button>
                </div>
            ))}
        </div>
    );
}
