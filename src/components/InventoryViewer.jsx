import React, { useState, useEffect } from 'react';
import { getInventory } from "../api/inventory";
import './InventoryViewer.css';

const InventoryViewer = ({ addToCart }) => {
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

  const handleSizeSelect = (item, size) => {
    setSelectedSize({ ...selectedSize, [item.clothing_type]: size });
  };

  const handleQuantityChange = (item, value) => {
    setSelectedQuantity({ ...selectedQuantity, [item.clothing_type]: parseInt(value) });
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

  // Placeholder image URL
  const img_url = "your_placeholder_image_url_here";

  return (
    <div>
      <br />
      <div className="inventory-grid">
        {inventory.map((item) => (
          <div key={item.clothing_type} className="item-container">
            <p className="item-name">{item.clothing_type}</p>
            <img src={img_url} alt="Product Image" width={200} />
            <p>Price: ${item.price}</p>

            <div className="size-selection">
              <p>Select Size:</p>
              {item.sizes.map((sizeInfo) => (
                <button
                  key={sizeInfo.size}
                  className={`size-button ${selectedSize[item.clothing_type]?.size === sizeInfo.size ? 'selected' : ''
                    }`}
                  onClick={() => handleSizeSelect(item, sizeInfo)}
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