import React, { useState, useEffect } from 'react';
import { getInventory } from "../api/inventory";
import { useCart } from '../api/CartContext'; // Import Cart Context
import './InventoryViewer.css';

const InventoryViewer = () => {
  const { addToCart } = useCart(); // Access addToCart function from CartContext

  // State for inventory and error handling
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");

  // Fetch inventory data
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

  // Split JSON into rows for rendering
  const split_json = (json) => {
    const split = [];
    const COLUMNS = 4;

    for (let i = 0; i < json.length; i += COLUMNS) {
      split.push(json.slice(i, i + COLUMNS)); // JS automatically handles OOB on slice
    }
    return split;
  };

  const rows = split_json(inventory);

  // Image placeholder
  const img_url = "https://via.placeholder.com/150"; // Replace with a relevant image URL

  // Function to add items to the cart
  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`${item.clothing_type} (${item.size}) added to the cart!`);
  };

  return (
    <div>
      <br />
      {error && <p className="error">{error}</p>}
      {rows.map((row, row_index) => (
        <div key={row_index} className="row">
          {row.map((item) => (
            <ul key={item.item_id} className="item-container">
              <p className="item-name">{item.clothing_type}</p>
              <img src={img_url} alt={item.clothing_type} width={200} />
              <p>Item ID: {item.item_id}</p>
              <p>Type: {item.clothing_type}</p>
              <p>Size: {item.size}</p>
              <p>Quantity Left: {item.quantity_available}</p>
              <p>Price: ${item.price}</p>
              <br />
              <button
                className="button"
                onClick={() => handleAddToCart({
                  id: item.item_id,
                  name: item.clothing_type,
                  size: item.size,
                  price: parseFloat(item.price),
                })}
              >
                Add to Cart
              </button>
              <br />
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
};

export default InventoryViewer;