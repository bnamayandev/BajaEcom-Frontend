// src/components/OrderDashboard.jsx

import React, { useState, useEffect } from 'react';
import { getSales, toggleFulfillmentStatus } from '../api/sales';
import './OrderDashboard.css';

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    // State variables for totals
    const [pendingRevenue, setPendingRevenue] = useState(0);
    const [fulfilledRevenue, setFulfilledRevenue] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await getSales();
            setOrders(response.data);
            calculateTotals(response.data); // Calculate totals after fetching orders
        } catch (error) {
            setError('Failed to fetch orders');
            console.error('Error Fetching Orders:', error);
        }
    };

    const calculateTotals = (ordersData) => {
        let pending = 0;
        let fulfilled = 0;
        let total = 0;

        ordersData.forEach((order) => {
            const orderTotal = parseFloat(order.order_total) || 0;
            total += orderTotal;

            if (order.status === 'fulfilled') {
                fulfilled += orderTotal;
            } else {
                pending += orderTotal;
            }
        });

        setPendingRevenue(pending);
        setFulfilledRevenue(fulfilled);
        setTotalRevenue(total);
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

            // Optimistically update the orders state
            const updatedOrders = orders.map((order) =>
                order.sale_id === orderId
                    ? {
                        ...order,
                        status: order.status === 'fulfilled' ? 'not fulfilled' : 'fulfilled',
                        staff_signoff: order.status === 'fulfilled' ? null : staffSignoff,
                    }
                    : order
            );

            setOrders(updatedOrders);
            calculateTotals(updatedOrders); // Recalculate totals with updated orders

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
        <div className="order-dashboard">
            <h1>Order Dashboard</h1>
            {error && <p className="error">{error}</p>}

            {/* Display Totals */}
            <div className="totals-container">
                <div className="totals-card">
                    <h2>Pending Revenue</h2>
                    <p>${pendingRevenue.toFixed(2)}</p>
                </div>
                <div className="totals-card">
                    <h2>Fulfilled Revenue</h2>
                    <p>${fulfilledRevenue.toFixed(2)}</p>
                </div>
                <div className="totals-card">
                    <h2>Total Revenue</h2>
                    <p>${totalRevenue.toFixed(2)}</p>
                </div>
            </div>

            {orders.length > 0 ? (
                <table className="orders-table">
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
                                    className={`status-cell ${order.status === 'fulfilled' ? 'fulfilled' : 'not-fulfilled'}`}
                                    onClick={() => handleStatusClick(order.sale_id, order.status)}
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
