import React, { useState, useEffect } from 'react';
import { getOrders, toggleFulfillmentStatus, toggleVoidStatus } from '../api/orders';
import './OrderDashboard.css';

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    // State variables for totals
    const [pendingRevenue, setPendingRevenue] = useState(0);
    const [fulfilledRevenue, setFulfilledRevenue] = useState(0);
    const [voidedRevenue, setVoidedRevenue] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await getOrders();
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
        let voided = 0;
        let total = 0;

        ordersData.forEach((order) => {
            const orderTotal = parseFloat(order.order_total) || 0;

            if (order.status === 'voided') {
                voided += orderTotal;
                // Do not add to total revenue
            } else {
                total += orderTotal;

                if (order.status === 'fulfilled') {
                    fulfilled += orderTotal;
                } else {
                    pending += orderTotal;
                }
            }
        });

        setPendingRevenue(pending);
        setFulfilledRevenue(fulfilled);
        setVoidedRevenue(voided);
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
                order.order_id === orderId
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

    const handleVoidClick = async (orderId, currentStatus) => {
        try {
            // Confirm action with the user
            const confirmMessage =
                currentStatus === 'voided'
                    ? 'Are you sure you want to reinstate this order?'
                    : 'Are you sure you want to void this order?';
            if (!window.confirm(confirmMessage)) {
                return;
            }

            // Optimistically update the orders state
            const updatedOrders = orders.map((order) =>
                order.order_id === orderId
                    ? {
                        ...order,
                        status: order.status === 'voided' ? 'not fulfilled' : 'voided',
                    }
                    : order
            );

            setOrders(updatedOrders);
            calculateTotals(updatedOrders); // Recalculate totals with updated orders

            // Call the API to toggle void status
            await toggleVoidStatus(orderId);
        } catch (error) {
            console.error('Error toggling void status:', error);
            alert('An error occurred while updating the order void status.');

            // Re-fetch orders to revert optimistic update in case of error
            fetchOrders();
        }
    };

    // Filter orders based on status
    const pendingOrders = orders.filter(
        (order) => order.status === 'not fulfilled' || order.status === 'fulfilled'
    );
    const voidedOrders = orders.filter((order) => order.status === 'voided');

    // Function to check if an order is within 24 hours after pickup date and time
    const isWithin24HoursAfterPickup = (order) => {
        const now = new Date();
        const pickupDateTime = new Date(order.pickup_date_time);
        const timeDiff = now - pickupDateTime;
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        return hoursDiff <= 24;
    };

    // Sort pending orders by pickup date and time (soonest first), including past but within 24 hours after pickup date
    pendingOrders.sort((a, b) => {
        const dateA = new Date(a.pickup_date_time);
        const dateB = new Date(b.pickup_date_time);
        return dateA - dateB;
    });

    // Filter out orders that are past 24 hours after pickup date and time (they should be voided automatically)
    const visiblePendingOrders = pendingOrders.filter(isWithin24HoursAfterPickup);

    // Sort voided orders by pickup date and time (optional)
    voidedOrders.sort((a, b) => {
        const dateA = new Date(a.pickup_date_time);
        const dateB = new Date(b.pickup_date_time);
        return dateA - dateB;
    });

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
                    <h2>Voided Revenue</h2>
                    <p>${voidedRevenue.toFixed(2)}</p>
                </div>
                <div className="totals-card">
                    <h2>Total Revenue</h2>
                    <p>${totalRevenue.toFixed(2)}</p>
                </div>
            </div>

            <h2>Pending and Fulfilled Orders</h2>
            {visiblePendingOrders.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Phone Number</th>
                            <th>User Info</th>
                            <th>Order Total</th>
                            <th>Pickup Date</th>
                            <th>Status</th>
                            <th>Staff Signoff</th>
                            <th>Items</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visiblePendingOrders.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.phone_number}</td>
                                <td className="user-info">
                                    <span>
                                        {order.first_name} {order.last_name}
                                    </span>
                                    <a href={`mailto:${order.email}`}>{order.email}</a>
                                </td>
                                <td>${Number(order.order_total || 0).toFixed(2)}</td>
                                <td>{new Date(order.pickup_date_time).toLocaleString()}</td>
                                <td>
                                    <span
                                        className={`status-cell ${order.status === 'fulfilled' ? 'fulfilled' : 'not-fulfilled'
                                            }`}
                                        onClick={() => handleStatusClick(order.order_id, order.status)}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td>{order.staff_signoff || 'N/A'}</td>
                                <td>
                                    <ul className="items-list">
                                        {Array.isArray(order.items) && order.items.length > 0 ? (
                                            order.items.map((item) => (
                                                <li key={item.order_item_id}>
                                                    {item.quantity} x {item.clothing_type} ({item.size}) - $
                                                    {item.total_price
                                                        ? Number(item.total_price).toFixed(2)
                                                        : '0.00'}
                                                </li>
                                            ))
                                        ) : (
                                            <li>No items available</li>
                                        )}
                                    </ul>
                                </td>
                                <td>
                                    <button
                                        className="void-button"
                                        onClick={() => handleVoidClick(order.order_id, order.status)}
                                    >
                                        &#10006;
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No pending or fulfilled orders available</p>
            )}

            <h2>Orders Voided</h2>
            {voidedOrders.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Phone Number</th>
                            <th>User Info</th>
                            <th>Order Total</th>
                            <th>Pickup Date</th>
                            <th>Status</th>
                            <th>Void Time</th>
                            <th>Items</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {voidedOrders.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.phone_number}</td>
                                <td className="user-info">
                                    <span>
                                        {order.first_name} {order.last_name}
                                    </span>
                                    <a href={`mailto:${order.email}`}>{order.email}</a>
                                </td>
                                <td>${Number(order.order_total || 0).toFixed(2)}</td>
                                <td>{new Date(order.pickup_date_time).toLocaleString()}</td>
                                <td>
                                    <span className="status-cell voided">{order.status}</span>
                                </td>
                                <td>
                                    {order.void_time ? new Date(order.void_time).toLocaleString() : 'N/A'}
                                </td>
                                <td>
                                    <ul className="items-list">
                                        {Array.isArray(order.items) && order.items.length > 0 ? (
                                            order.items.map((item) => (
                                                <li key={item.order_item_id}>
                                                    {item.quantity} x {item.clothing_type} ({item.size}) - $
                                                    {item.total_price
                                                        ? Number(item.total_price).toFixed(2)
                                                        : '0.00'}
                                                </li>
                                            ))
                                        ) : (
                                            <li>No items available</li>
                                        )}
                                    </ul>
                                </td>
                                <td>
                                    <button
                                        className="reinstate-button"
                                        onClick={() => handleVoidClick(order.order_id, order.status)}
                                    >
                                        Reinstate
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No voided orders available</p>
            )}
        </div>
    );
};

export default OrderDashboard;