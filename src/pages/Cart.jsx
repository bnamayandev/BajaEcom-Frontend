import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import './Cart.css';

const Cart = ({ cart, updateCartItem, removeCartItem, placeOrder }) => {
  const [pickupDateTime, setPickupDateTime] = useState(null);
  const [quantityErrors, setQuantityErrors] = useState({});

  // Function to check if the selected date is a weekday (Monday to Friday)
  const isWeekday = (date) => {
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    return day !== 0 && day !== 6;
  };

  // Custom function to filter time based on the day of the week
  const filterTime = (time) => {
    const day = pickupDateTime?.getDay() || new Date().getDay(); // Get selected day
    const hours = time.getHours();

    if (day === 1 || day === 4) {
      // Monday or Thursday: 12:00 PM - 9:00 PM
      return hours >= 12 && hours < 21;
    } else if (day === 2 || day === 3 || day === 5) {
      // Tuesday, Wednesday, or Friday: 12:00 PM - 6:00 PM
      return hours >= 12 && hours < 18;
    }

    return false; // Disable times for weekends
  };

  const handlePlaceOrder = () => {
    const errors = {};
    cart.forEach((item) => {
      if (item.quantity > item.quantity_available) {
        errors[`${item.item_id}-${item.size}`] = `Only ${item.quantity_available} items available.`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setQuantityErrors(errors);
      alert('Order not placed, requested amount exceeds stock available.');
      return;
    }

    if (!pickupDateTime) {
      alert('Please select a pickup date and time.');
      return;
    }

    placeOrder(pickupDateTime);
  };

  const handleQuantityChange = (item, value) => {
    let quantity = parseInt(value);
    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
    }

    if (quantity > item.quantity_available) {
      quantity = item.quantity_available;
      setQuantityErrors({
        ...quantityErrors,
        [`${item.item_id}-${item.size}`]: `Maximum available quantity is ${item.quantity_available}.`,
      });
    } else {
      setQuantityErrors({
        ...quantityErrors,
        [`${item.item_id}-${item.size}`]: null,
      });
    }

    updateCartItem(item.item_id, item.size, quantity);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">CART</h2>
      {cart.length === 0 ? (
        <p className="empty-cart-message">No items in cart</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={`${item.item_id}-${item.size}`} className="cart-item">
                <img src={item.item_photo} alt="Product" className="cart-item-image" />
                <div className="item-details">
                  <h3>{item.productName}</h3>
                  <p>{item.productDescription}</p>
                  <p>Size: {item.size}</p>
                  <p>Price per item: ${item.price.toFixed(2)}</p>
                </div>
                <div className="item-actions">
                  <label>
                    Quantity:
                    <input
                      type="number"
                      min="1"
                      max={item.quantity_available}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item, e.target.value)}
                      className="quantity-input"
                    />
                  </label>
                  {quantityErrors[`${item.item_id}-${item.size}`] && (
                    <p className="error-message">{quantityErrors[`${item.item_id}-${item.size}`]}</p>
                  )}
                  <p className="item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="remove-item-btn"
                    onClick={() => removeCartItem(item.item_id, item.size)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h3 className="cart-total">TOTAL: ${calculateTotalPrice().toFixed(2)}</h3>

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
              filterDate={isWeekday} // Only allow weekdays
              filterTime={filterTime} // Filter times based on the day
            />
          </div>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
