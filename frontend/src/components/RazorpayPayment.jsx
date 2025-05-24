import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RazorpayPayment = ({ amount, orderId, onSuccess, onFailure }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true); // already loaded

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrder = async () => {
    const response = await axios.post('http://localhost:5001/api/create-order', {
      amount: Math.round(amount * 100), // Convert to paise
    });
    return response.data;
  };

  const initializeRazorpay = async () => {
    setIsLoading(true);
    setError(null);

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      setError("Failed to load Razorpay SDK. Please refresh and try again.");
      setIsLoading(false);
      return onFailure({ message: "Razorpay SDK not loaded" });
    }

    try {
      const order = await createOrder();
      const options = {
        key: "rzp_test_NU6XBPuT004bec",
        amount: order.amount,
        currency: "INR",
        name: "MediKart",
        description: "Medicine Purchase",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verificationResponse = await axios.post('http://localhost:5001/api/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verificationResponse.data.verified) {
              onSuccess({
                ...response,
                amount,
                orderId: orderId || order.id
              });
              navigate('/user', {
                state: {
                  orderId: orderId || order.id,
                  paymentId: response.razorpay_payment_id,
                  amount
                }
              });
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            setError("Payment verification failed");
            onFailure(error);
          }
        },
        prefill: {
          name: localStorage.getItem('username') || "Patient Name",
          email: localStorage.getItem('email') || "patient@example.com",
          contact: ""
        },
        theme: { color: "#3B82F6" },
        modal: {
          ondismiss: () => setIsLoading(false)
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setIsLoading(false);
        setError(response.error.description);
        onFailure(response.error);
      });
      rzp.open();
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      onFailure(error);
    }
  };

  return (
    <div>
      {error && (
        <div style={{
          color: '#DC2626',
          backgroundColor: '#FEE2E2',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '20px', // increased bottom margin
          fontSize: '14px',
          textAlign: 'center',
          lineHeight: '1.5'
        }}>
          {error}
        </div>
      )}
      <button
        onClick={initializeRazorpay}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '12px 24px',
          backgroundColor: isLoading ? '#94A3B8' : '#3B82F6',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '8px',
          border: 'none',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: '16px'
        }}
      >
        {isLoading ? 'Processing...' : `Pay ₹${amount}`}
      </button>
    </div>
  );
};

export default RazorpayPayment;
