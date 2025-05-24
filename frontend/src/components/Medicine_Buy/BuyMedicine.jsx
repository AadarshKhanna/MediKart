import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../login/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import RazorpayPayment from '../RazorpayPayment'; // Adjust the path if needed
import './BuyMedicine.css';

const BuyMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
const gstAmount = subtotal * 0.18;
const totalAmount = subtotal + gstAmount;

  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [age, setAge] = useState("");
  const [prescription, setPrescription] = useState(null);
  const getCartQuantity = () => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/medicines")
      .then((response) => {
        const medicinesWithImages = response.data.map((medicine) => ({
          ...medicine,
          image: medicine.image
            ? `http://localhost:5001/images/${medicine.image}`
            : null,
        }));
        setMedicines(medicinesWithImages);
      })
      .catch((error) => console.error("Error fetching medicines:", error));
  }, []);

  const addToCart = (medicine) => {
    const existing = cart.find((item) => item.id === medicine.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

const decreaseQuantity = (id) => {
  const item = cart.find((item) => item.id === id);
  if (item.quantity === 1) {
    // Remove from cart
    removeFromCart(id);
  } else {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  }
};

const calculateTotal = () => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const handlePaymentSuccess = (response) => {
  const formData = new FormData();
  formData.append("cart", JSON.stringify(cart));
  formData.append("age", age);
  formData.append("address", address);
  formData.append("pincode", pincode);
  formData.append("prescription", prescription);

  axios
    .post("http://localhost:5001/api/orders", formData)
    .then(() => {
      alert("Order placed! Our doctors will review your prescription.");
      setCart([]);
      setAddress("");
      setAge("");
      setPincode("");
      setPrescription(null);
      setShowCheckout(false);
      setShowCart(false);
    })
    .catch((error) => {
      alert("Error placing order. Please try again.");
      console.error("Order error:", error);
    });
};

const handlePaymentFailure = (error) => {
  console.error("Payment failed:", error);
  alert("Payment failed: " + error.message);
};

  const handleCheckout = () => {
    setShowCheckout(true);
  };

const submitOrder = () => {
  if (!address.trim()) {
    alert("Please enter your address.");
    return;
  }

  const pincodeRegex = /^\d{6}$/;
  if (!pincodeRegex.test(pincode)) {
    alert("Please enter a valid 6-digit pincode.");
    return;
  }

  if (!prescription) {
    alert("You must upload a prescription to proceed.");
    return;
  }

  const formData = new FormData();
  formData.append("cart", JSON.stringify(cart)); // Sending entire cart
  formData.append("age", age);
  formData.append("address", address);
  formData.append("pincode", pincode);
  formData.append("prescription", prescription);

  axios
    .post("http://localhost:5001/api/orders", formData)
    .then(() => {
      alert("Order placed! Our doctors will review your prescription.");
      setCart([]);
      setAddress("");
      setAge("");
      setPincode("");
      setPrescription(null);
      setShowCheckout(false);
      setShowCart(false);
    })
    .catch((error) => {
      alert("Error placing order. Please try again.");
      console.error("Order error:", error);
    });
};


  return (
    
    <div style={styles.container}>
    <Navbar/>
      <div className="header-bar">
        {showCart ? (
          <button onClick={() => setShowCart(false)} className="back-button">
            ⬅ Back
          </button>
        ) : (
          <div></div> // Keeps spacing consistent when cart is closed
        )}
        <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setShowCart(!showCart)}>
          <FaShoppingCart size={30} className="cart-icon" />
          {getCartQuantity() > 0 && (
            <div style={{
              position: "absolute",
              top: -5,
              right: -10,
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
            }}>
              {getCartQuantity()}
            </div>
          )}
        </div>
      </div>

      {showCart ? (
        <div>
          <h2 style={styles.heading}>Cart</h2>
          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <div style={{ flex: 2 }}>{item.name}</div>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <button onClick={() => decreaseQuantity(item.id)} style={{ marginRight: 5 }}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} style={{ marginLeft: 5 }}>+</button>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>₹{item.price * item.quantity}</div>
                  <div style={{ flex: 0.5, textAlign: "center" }}>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
              <p>
                <strong>Total:</strong> ₹
                {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
              </p>

              <button style={styles.checkoutButton} onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <h2 style={styles.heading}>Available Medicines</h2>
          <div style={styles.medicineList}>
            {medicines.map((medicine) => (
              <div key={medicine.id} className="card">
                <img src={medicine.image} alt={medicine.name} style={styles.image} />
                <h3>{medicine.name}</h3>
                <p>{medicine.description}</p>
                <p>₹{medicine.price}</p>
                {(() => {
                  const itemInCart = cart.find((item) => item.id === medicine.id);
                  return itemInCart ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                      <button onClick={() => decreaseQuantity(medicine.id)}>-</button>
                      <span>{itemInCart.quantity}</span>
                      <button onClick={() => increaseQuantity(medicine.id)}>+</button>
                    </div>
                  ) : (
                    <button style={styles.button} onClick={() => addToCart(medicine)}>
                      Add to Cart
                    </button>
                  );
                })()}
              </div>
            ))}
          </div>
        </>
      )}

      {showCheckout && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "90%",
              maxWidth: "400px",
            }}
          >
            <h3>Checkout</h3>
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={styles.input}
            />
            <input
              type="file"
              onChange={(e) => setPrescription(e.target.files[0])}
              style={styles.input}
            />
            <p style={{ color: "red" }}>
              Note: Prescription will be verified. Invalid ones will be rejected.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginTop: '20px'
            }}>
              <div style={{
                backgroundColor: '#f3f4f6',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '15px',
                fontSize: '15px',
                lineHeight: '1.6',
                border: '1px solid #d1d5db'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>GST (18%)</span>
                  <span>₹{gstAmount.toFixed(2)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 'bold',
                  marginTop: '10px'
                }}>
                  <span>Total</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <RazorpayPayment
                amount={(calculateTotal() * 1.18).toFixed(2)}
                orderId={`ORD-${Date.now()}`}
                onSuccess={handlePaymentSuccess}
                onFailure={handlePaymentFailure}
              />
              <button
                onClick={() => setShowCheckout(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Cancel
              </button>
      </div>

          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop:"70px",
    padding: "20px",
    backgroundColor: "#e7e7ee",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#2c3e50",
    textTransform: "uppercase",
    letterSpacing: "1px",
    borderBottom: "3px solid #3498db",
    display: "inline-block",
    paddingBottom: "5px",
  },
  medicineList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  checkoutButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  }
};

export default BuyMedicine;
