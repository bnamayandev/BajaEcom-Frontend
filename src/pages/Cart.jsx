import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Cart.css'

const Cart = ({ cart, cartMapper, placeOrder }) => {
  const [pickupDateTime, setPickupDateTime] = useState(null);

  const handlePlaceOrder = () => {
    if (!pickupDateTime) {
      alert('Please select a pickup date and time.');
      return;
    }
    placeOrder(pickupDateTime);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      <div className="cart-items">{cartMapper()}</div>

      <div className="pickup-section">
        <h3 className="pickup-title">Select Pickup Date and Time</h3>
        <DatePicker
          selected={pickupDateTime}
          onChange={(date) => setPickupDateTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          minDate={new Date()}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select a date and time"
          className="date-picker"
        />
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Cart;

