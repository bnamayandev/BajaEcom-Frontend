import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <div className="how-it-works-container">
            <h1>How It Works</h1>
            <div className="instructions">
                <ol>
                    <li>
                        <strong>Place Your Order:</strong> Browse our inventory and add items to your cart.
                    </li>
                    <li>
                        <strong>Check Your Email:</strong> After placing your order, you'll receive a confirmation email.
                    </li>
                    <li>
                        <strong>Pickup Details:</strong> A Baja team member will contact via text and/or email you as the pickup deadline approaches to arrange the details.
                    </li>
                    <li>
                        <strong>Payment:</strong> All transactions are handled in cash or e-transfer upon pickup.
                    </li>
                    <li>
                        <strong>Voiding:</strong> If you do not respond to Western Baja's texts and/or emails, your order will be cancelled, and you will have to re-place an order.
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default HowItWorks;