// src/components/InventoryViewer.jsx

import React, { useState, useEffect } from 'react';
import { getInventory } from "../api/inventory";
import './InventoryViewer.css';

const InventoryViewer = ({ addToCart }) => {
  // State variables
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState({});

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await getInventory();
        setInventory(response.data);
      } catch (error) {
        setError("Failed to fetch inventory");
        console.error("Error Fetching Inventory: ", error);
      }
    };
    fetchInventory();
  }, []);

  const handleAddToCart = (item) => {
    const size = selectedSize[item.item_id] || item.size;
    const quantity = selectedQuantity[item.item_id] || 1;

    addToCart({
      item_id: item.item_id,
      productName: item.clothing_type,
      productDescription: 'Description of the product',
      price: parseFloat(item.price),
      size,
      quantity,
    });
  };

  // Split inventory into rows for display
  const splitInventory = (items) => {
    const rows = [];
    const columns = 4;
    for (let i = 0; i < items.length; i += columns) {
      rows.push(items.slice(i, i + columns));
    }
    return rows;
  };

  const rows = splitInventory(inventory);

  // Placeholder image URL
  const img_url = "your_placeholder_image_url_here";

  return (
    <div>
      <br />
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((item) => (
            <ul key={item.item_id} className="item-container">
              <p className="item-name">{item.clothing_type}</p>
              <img src={img_url} alt="Product Image" width={200} />
              <p>Item ID: {item.item_id}</p>
              <p>Available Size: {item.size}</p>
              <p>Quantity Left: {item.quantity_available}</p>
              <p>Price: ${item.price}</p>
              <label>
                Select Size:
                <input
                  type="text"
                  value={selectedSize[item.item_id] || item.size}
                  onChange={(e) =>
                    setSelectedSize({ ...selectedSize, [item.item_id]: e.target.value })
                  }
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  min="1"
                  max={item.quantity_available}
                  value={selectedQuantity[item.item_id] || 1}
                  onChange={(e) =>
                    setSelectedQuantity({ ...selectedQuantity, [item.item_id]: parseInt(e.target.value) })
                  }
                />
              </label>
              <button className="button" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
            </ul>
          ))}
        </div>
      ))}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default InventoryViewer;