import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Cart.css';

const Cart = ({ cart, updateCartItem, removeCartItem, placeOrder }) => {
  const [pickupDateTime, setPickupDateTime] = useState(null);

  // Function to check if the selected date is a weekday (Monday to Friday)
  const isWeekday = (date) => {
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    return day !== 0 && day !== 6;
  };

  // Function to filter allowed times based on the day of the week
  const filterPassedTime = (time) => {
    const day = time.getDay(); // Get day of week from time (0-6)
    const hours = time.getHours(); // Get hours from time (0-23)

    if (day === 1 || day === 4) {
      // Monday (1) or Thursday (4): allow times from 12 PM to 9 PM
      return hours >= 12 && hours <= 21;
    } else if (day >= 1 && day <= 5) {
      // Other weekdays (Tuesday to Friday): allow times from 12 PM to 5 PM
      return hours >= 12 && hours <= 17;
    } else {
      // Weekend (Saturday and Sunday): no times allowed
      return false;
    }
  };

  const handlePlaceOrder = () => {
    if (!pickupDateTime) {
      alert('Please select a pickup date and time.');
      return;
    }
    placeOrder(pickupDateTime);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={`${item.item_id}-${item.size}`} className="cart-item">
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
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartItem(item.item_id, item.size, parseInt(e.target.value))
                      }
                      className="quantity-input"
                    />
                  </label>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
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
          <h3 className="cart-total">Total: ${calculateTotalPrice().toFixed(2)}</h3>

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
              filterDate={isWeekday}        // Only allow weekdays
              filterTime={filterPassedTime} // Filter allowed times
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