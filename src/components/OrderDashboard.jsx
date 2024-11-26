import React, { useState, useEffect } from 'react';
import { getSales, toggleFulfillmentStatus } from '../api/sales';
import './OrderDashboard.css';

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await getSales();
            setOrders(response.data);
        } catch (error) {
            setError('Failed to fetch orders');
            console.error('Error Fetching Orders:', error);
        }
    };

    const handleStatusClick = async (orderId, currentStatus) => {
        try {
            let staffSignoff = null;

            if (currentStatus === 'not fulfilled') {
                // Prompt the user for their name
                staffSignoff = prompt('Enter your name for staff signoff:');

                if (!staffSignoff || staffSignoff.trim() === '') {
                    alert('Staff signoff is required to fulfill an order.');
                    return;
                }
            }

            // Optimistically update the status and staff signoff in the UI
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.sale_id === orderId
                        ? {
                            ...order,
                            status: order.status === 'fulfilled' ? 'not fulfilled' : 'fulfilled',
                            staff_signoff: order.status === 'fulfilled' ? null : staffSignoff,
                        }
                        : order
                )
            );

            // Call the API to toggle status
            await toggleFulfillmentStatus(orderId, staffSignoff);
        } catch (error) {
            console.error('Error toggling order status:', error);
            alert('An error occurred while updating the order status.');

            // Re-fetch orders to revert optimistic update in case of error
            fetchOrders();
        }
    };

    return (
        <div>
            <h1>Order Dashboard</h1>
            {error && <p className="error">{error}</p>}
            {orders.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User ID</th>
                            <th>Item ID</th>
                            <th>Quantity</th>
                            <th>Size</th>
                            <th>Order Total</th>
                            <th>Pickup Date</th>
                            <th>Status</th>
                            <th>Staff Signoff</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.sale_id}>
                                <td>{order.sale_id}</td>
                                <td>{order.user_id}</td>
                                <td>{order.item_id}</td>
                                <td>{order.order_quantity}</td>
                                <td>{order.order_size}</td>
                                <td>${Number(order.order_total || 0).toFixed(2)}</td>
                                <td>{new Date(order.pickup_date_time).toLocaleString()}</td>
                                <td
                                    className="status-cell"
                                    onClick={() => handleStatusClick(order.sale_id, order.status)}
                                    style={{
                                        cursor: 'pointer',
                                        color: order.status === 'fulfilled' ? 'green' : 'red',
                                    }}
                                >
                                    {order.status}
                                </td>
                                <td>{order.staff_signoff || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders available</p>
            )}
        </div>
    );
};

export default OrderDashboard;