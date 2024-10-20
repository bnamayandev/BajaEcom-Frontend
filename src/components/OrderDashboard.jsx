// src/components/OrderDashboard.jsx
import React, { useState, useEffect } from "react";
import { getSales } from "../api/sales"; // You'll need to create this function
import "./OrderDashboard.css";

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getSales();
                setOrders(response.data);
            } catch (error) {
                setError("Failed to fetch orders");
                console.error("Error Fetching Orders: ", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="order-dashboard">
            <h1>Orders</h1>
            {error && <p className="error">{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>Item ID</th>
                        <th>Quantity</th>
                        <th>Size</th>
                        <th>Pickup Date</th>
                        <th>Status</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.sale_id}>
                            <td>{order.sale_id}</td>
                            <td>{order.user_id}</td>
                            <td>{order.item_id}</td>
                            <td>{order.order_quantity}</td>
                            <td>{order.order_size}</td>
                            <td>{new Date(order.pickup_date_time).toLocaleString()}</td>
                            <td>{order.status}</td>
                            <td>${order.order_total.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDashboard;
