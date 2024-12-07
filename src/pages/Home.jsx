import React, { useState, useEffect } from 'react';
import './Home.css';
import InventoryViewer from '../components/InventoryViewer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const images = ['/FunnyImage.JPG']; // Correct path for public assets

const Home = ({ addToCart, cart }) => {
  const navigate = useNavigate(); // useNavigate hook is now correctly defined
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [nextImage, setNextImage] = useState(images[1]);

  useEffect(() => {
    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    };

    const rotateImage = async () => {
      const currentIndex = images.indexOf(currentImage);
      const nextIndex = (currentIndex + 1) % images.length;
      try {
        await preloadImage(images[nextIndex]);
        setNextImage(images[nextIndex]);
        setTimeout(() => {
          setCurrentImage(images[nextIndex]);
        }, 50);
      } catch (error) {
        console.error(`Error preloading image: ${images[nextIndex]}`, error);
      }
    };

    const interval = setInterval(rotateImage, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="home-container">
      <div className="home" style={{ backgroundImage: `url(${currentImage})` }}>
        <div className="home-overlay" style={{ backgroundImage: `url(${nextImage})` }}></div>
        <h1>OFFICIAL WESTERN BAJA RACING MERCH STORE</h1>
      </div>
      <div className="cardSec">
        <InventoryViewer addToCart={addToCart} cart={cart} />
      </div>
    </div>
  );
};

export default Home;
