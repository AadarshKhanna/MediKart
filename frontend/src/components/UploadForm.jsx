import React, { useState, useRef } from 'react';
import axios from 'axios';
import medicineMapping from '../data/medicineData';
import { FaShoppingCart } from 'react-icons/fa';
import './UploadForm.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [age, setAge] = useState('');
  const fileInputRef = useRef();
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/api/predict', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Prediction failed', error);
      setResult({ error: 'Prediction failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setResult(null);
    }
  };

  const addToCart = (medicine) => {
    setCart((prev) => ({
      ...prev,
      [medicine]: prev[medicine] ? prev[medicine] + 1 : 1,
    }));
  };

  const increaseQty = (medicine) => {
    setCart((prev) => ({
      ...prev,
      [medicine]: prev[medicine] + 1,
    }));
  };

  const decreaseQty = (medicine) => {
    setCart((prev) => {
      const newQty = prev[medicine] - 1;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[medicine];
        return updated;
      }
      return { ...prev, [medicine]: newQty };
    });
  };

  const getTotalQty = () => {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  };

const handleCheckoutSubmit = () => {
  if (!address || !age || !pincode) {
    alert("Please fill all fields before submitting!");
    return;
  }

  const pincodeRegex = /^\d{6}$/;
  if (!pincodeRegex.test(pincode)) {
    alert("Pincode must be a 6-digit number.");
    return;
  }

  const ageNumber = parseInt(age, 10);
  if (isNaN(ageNumber) || ageNumber < 10 || ageNumber > 100) {
    alert("Age must be a number between 10 and 100.");
    return;
  }

  // Proceed with submission
  alert("Order submitted successfully!");
  setShowCheckout(false);
  setShowCart(false);
  setCart({});
  setAddress('');
  setAge('');
  setPincode('');
};


  return (
    <div className="upload-container">
            {/* Cart Icon */}
      {/* Floating Cart Icon */}
      <div className="cart-float" onClick={() => setShowCart(!showCart)}>
        <FaShoppingCart size={24} />
        {getTotalQty() > 0 && <span className="cart-count">{getTotalQty()}</span>}
      </div>

      {/* Floating Back Button */}
      {showCart && (
        <div className="back-float" onClick={() => setShowCart(false)}>
          ⬅ Back
        </div>
      )}
      {/* Show only cart if open */}
      {showCart ? (
        <div className="cart-box">
          <h3>Cart</h3>
          {Object.keys(cart).length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <>
              <ul>
                {Object.entries(cart).map(([medicine, qty]) => {
                  // Find the price from the mapping
                  const allMeds = Object.values(medicineMapping).flat();
                  const medObj = allMeds.find((m) => m.name === medicine);
                  const price = medObj?.price || 0;
                  return (
                    <li key={medicine} className="medicine-item" style={{ justifyContent: 'space-between' }}>
                      <div>
                        <strong>{medicine}</strong>
                        <div style={{ fontSize: '0.85rem', color: '#555' }}>
                          ₹{price} × {qty} = ₹{price * qty}
                        </div>
                      </div>
                      <div className="qty-controls">
                        <button onClick={() => decreaseQty(medicine)}>-</button>
                        <span>{qty}</span>
                        <button onClick={() => increaseQty(medicine)}>+</button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
                Total:{' '}
                ₹{Object.entries(cart).reduce((total, [medicine, qty]) => {
                  const allMeds = Object.values(medicineMapping).flat();
                  const medObj = allMeds.find((m) => m.name === medicine);
                  const price = medObj?.price || 0;
                  return total + price * qty;
                }, 0)}
              </p>
              <button className="submit-btn" onClick={() => setShowCheckout(true)}>
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <h1>Skin Disease Detector</h1>
          <form onSubmit={handleSubmit} className="upload-form">
            <div
              className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              {file ? <p>{file.name}</p> : <p>Drag & drop image here or click to select</p>}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="file-input-hidden"
              />
            </div>
            <button type="submit" className="submit-btn">
              {loading ? 'Predicting...' : 'Predict'}
            </button>
          </form>

          {result && (
            <div className="result-card">
              {result.error ? (
                <p className="error">{result.error}</p>
              ) : (
                <>
                  <h2>Prediction Result</h2>
                  <p><strong>Disease:</strong> {result.disease}</p>
                  <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
                  <p><strong>Suggestion:</strong> {result.suggestion}</p>

                  <div className="recommend-box">
                    <h3>Recommended Medicines</h3>
                    <ul className="medicine-list">
                      {(medicineMapping[result.disease] || []).map((medicineObj) => {
                      const { name, price } = medicineObj;
                      return (
                        <li key={name} className="medicine-item">
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 'bold' }}>{name}</span>
                            <span style={{ fontSize: '0.9rem', color: '#666' }}>₹{price}</span>
                          </div>
                          {cart[name] ? (
                            <div className="qty-controls">
                              <button onClick={() => decreaseQty(name)}>-</button>
                              <span>{cart[name]}</span>
                              <button onClick={() => increaseQty(name)}>+</button>
                            </div>
                          ) : (
                            <button className="add-cart-btn" onClick={() => addToCart(name)}>
                              Add to Cart
                            </button>
                          )}
                        </li>
                      );
                    })
                    }
                    </ul>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}

      {/* Checkout popup */}
      {showCheckout && (
        <div className="checkout-popup">
          <div className="popup-content">
            <h2>Checkout</h2>
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <div style={{ marginTop: '10px' }}>
              <button className="submit-btn" onClick={handleCheckoutSubmit}>Submit</button>
              <button className="submit-btn" style={{ backgroundColor: '#999', marginLeft: '10px' }} onClick={() => setShowCheckout(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
