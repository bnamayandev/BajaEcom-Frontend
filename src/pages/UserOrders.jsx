import React, { useEffect, useState } from 'react';
import { getUserOrders, cancelOrder } from '../api/orders';
import { useNavigate } from 'react-router-dom';
import './UserOrders.css';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserOrders();
    }, []);

    const fetchUserOrders = async () => {
        try {
            const response = await getUserOrders();
            setOrders(response.data);
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                // Token is invalid or expired, redirect to login
                navigate('/login');
            } else {
                setError('Failed to fetch orders');
                console.error('Error Fetching Orders:', error);
            }
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            // Confirm action with the user
            if (!window.confirm('Are you sure you want to cancel this order?')) {
                return;
            }

            await cancelOrder(orderId);

            // Update orders list after cancellation
            fetchUserOrders();
        } catch (error) {
            console.error('Error canceling order:', error);
            alert('An error occurred while canceling your order.');
        }
    };

    return (
        <div className="user-orders-container">
            <h1>My Orders</h1>
            {error && <p className="error">{error}</p>}
            {orders.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Total</th>
                            <th>Time Placed</th>
                            <th>Pickup Date</th>
                            <th>Status</th>
                            <th>Items</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>${Number(order.order_total || 0).toFixed(2)}</td>
                                <td>{new Date(order.order_date_time).toLocaleString()}</td>
                                <td>{new Date(order.pickup_date_time).toLocaleString()}</td>
                                <td>{order.status}</td>
                                <td>
                                    <ul className="items-list">
                                        {Array.isArray(order.items) && order.items.length > 0 ? (
                                            order.items.map((item) => (
                                                <li key={item.order_item_id}>
                                                    {item.quantity} x {item.clothing_type} ({item.size}) - $
                                                    {item.total_price ? Number(item.total_price).toFixed(2) : '0.00'}
                                                </li>
                                            ))
                                        ) : (
                                            <li>No items available</li>
                                        )}
                                    </ul>
                                </td>
                                <td>
                                    {order.status === 'not fulfilled' && (
                                        <button
                                            className="cancel-button"
                                            onClick={() => handleCancelOrder(order.order_id)}
                                        >
                                            Cancel Order
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>You have no orders.</p>
            )}
        </div>
    );
};

export default UserOrders;