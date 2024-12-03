import React, { useState, useEffect } from 'react';
import { getInventory } from "../api/inventory";
import './InventoryViewer.css';
import { useNavigate } from 'react-router-dom';

const InventoryViewer = ({ addToCart }) => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await getInventory();
        setInventory(response.data);
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Token is invalid or expired, redirect to login
          navigate('/login');
        } else {
          setError("Failed to fetch inventory");
          console.error("Error Fetching Inventory: ", error);
        }
      }
    };
    fetchInventory();
  }, [navigate]);

  const handleSizeSelect = (item, sizeInfo) => {
    setSelectedSize({ ...selectedSize, [item.clothing_type]: sizeInfo });
    // Reset quantity to 1 when size changes
    setSelectedQuantity({ ...selectedQuantity, [item.clothing_type]: 1 });
  };

  const handleQuantityChange = (item, value) => {
    const maxQuantity = selectedSize[item.clothing_type]?.quantity_available || 1;
    let quantity = parseInt(value);

    // Ensure quantity does not exceed available stock
    if (quantity > maxQuantity) {
      quantity = maxQuantity;
    } else if (quantity < 1 || isNaN(quantity)) {
      quantity = 1;
    }

    setSelectedQuantity({ ...selectedQuantity, [item.clothing_type]: quantity });
  };

  const handleAddToCart = (item) => {
    const sizeInfo = selectedSize[item.clothing_type];
    if (!sizeInfo) {
      alert('Please select a size.');
      return;
    }

    const quantity = selectedQuantity[item.clothing_type] || 1;

    addToCart({
      item_id: sizeInfo.item_id,
      productName: item.clothing_type,
      productDescription: 'Description of the product',
      price: parseFloat(item.price),
      size: sizeInfo.size,
      quantity,
    });
  };

  return (
    <div>
      <br />
      <div className="inventory-grid">
        {inventory.map((item) => (
          <div key={item.clothing_type} className="item-container">
            <p className="item-name">{item.clothing_type}</p>
            <img src={item.item_photo} alt="Product Image" width={200} />
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>

            <div className="size-selection">
              <p>Select Size:</p>
              {item.sizes.map((sizeInfo) => (
                <button
                  key={sizeInfo.item_id}
                  className={`size-button ${selectedSize[item.clothing_type]?.item_id === sizeInfo.item_id ? 'selected' : ''} ${sizeInfo.quantity_available === 0 ? 'sold-out' : ''}`}
                  onClick={() => handleSizeSelect(item, sizeInfo)}
                  disabled={sizeInfo.quantity_available === 0}
                >
                  {sizeInfo.size}
                </button>
              ))}
            </div>

            <label>
              Quantity:
              <input
                type="number"
                min="1"
                max={
                  selectedSize[item.clothing_type]?.quantity_available || 1
                }
                value={selectedQuantity[item.clothing_type] || 1}
                onChange={(e) => handleQuantityChange(item, e.target.value)}
                disabled={!selectedSize[item.clothing_type]}
              />
            </label>

            <button className="button" onClick={() => handleAddToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default InventoryViewer;