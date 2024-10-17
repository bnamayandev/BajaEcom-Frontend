import React, { useEffect, useState } from 'react';
import { getSales } from '../api/sales'; // why 3 dots?

function OrderList({ token }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getSales(token);
                setOrders(response.data);
            } catch (err) {
                console.error('Error fetching sales: ', err);
            }
        };

        fetchOrders();
    }, [token]);

    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {orders.map((order) => (  // Loop through the orders and display them
                    <li key={order.sale_id}>
                        Order ID: {order.sale_id} | Status: {order.status} | Total: ${order.order_total}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;