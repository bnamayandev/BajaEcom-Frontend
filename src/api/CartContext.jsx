import React, { createContext, useContext, useState } from 'react';

// Create the context
export const CartContext = createContext(); // Add the named export here

// Provide cart context to the app
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add an item to the cart
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.item_id === item.item_id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.item_id === item.item_id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    // Remove an item from the cart
    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter(cartItem => cartItem.item_id !== itemId));
    };

    // Clear the cart
    const clearCart = () => {
        setCart([]);
    };

    // Calculate total cost
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, calculateTotal }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook to use the cart context
export const useCart = () => {
    return useContext(CartContext);
};
