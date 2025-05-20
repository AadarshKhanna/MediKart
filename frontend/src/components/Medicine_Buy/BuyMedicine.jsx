import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../login/Navbar";
import { FaShoppingCart } from "react-icons/fa";

const BuyMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [age, setAge] = useState("");
  const [prescription, setPrescription] = useState(null);

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

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px" }}>
        {showCart ? (
          <button onClick={() => setShowCart(false)} style={styles.backButton}>
            ⬅ Back
          </button>
        ) : (
          <div></div> // Keeps spacing consistent when cart is closed
        )}
        <FaShoppingCart
          size={30}
          onClick={() => setShowCart(!showCart)}
          style={{ cursor: "pointer", color: "#333" }}
        />
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
                    <button onClick={() => removeFromCart(item.id)}>🗑️</button>
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
              <div key={medicine.id} style={styles.card}>
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

            <div style={{ marginTop: 10 }}>
              <button style={{ marginRight: 10 }} onClick={submitOrder}>
                Submit
              </button>
              <button onClick={() => setShowCheckout(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#e7e7ee",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  medicineList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "10px",
    width: "200px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    textAlign: "center",
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
    backgroundColor: "#007bff",
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
  },
backButton: {
  marginBottom: "10px",
  padding: "8px 12px",
  backgroundColor: "#343a40", // dark grey
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold"
}

};

export default BuyMedicine;
