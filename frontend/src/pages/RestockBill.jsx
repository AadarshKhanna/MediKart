// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const GST_PERCENTAGE = 18;

// const defaultCompanies = [
//   { id: "c1", name: "Sun Pharma", price: 50 },
//   { id: "c2", name: "Cipla", price: 45 },
//   { id: "c3", name: "Dr. Reddy's", price: 55 },
// ];

// const retailSellers = [
//   { id: "r1", name: "Apollo Pharmacy" },
//   { id: "r2", name: "MedPlus" },
//   { id: "r3", name: "Netmeds" },
//   { id: "r4", name: "1mg" },
// ];

// const paymentMethods = [
//   { id: "razorpay", label: "Razorpay" },
//   { id: "upi", label: "UPI" },
//   { id: "netbanking", label: "Net Banking" },
//   { id: "cod", label: "Cash on Delivery (COD)" },
// ];

// function RestockBill() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { medicine = {} } = location.state || {};

//   const [quantity, setQuantity] = useState(1);
//   const [selectedCompany, setSelectedCompany] = useState(defaultCompanies[0]);
//   const [selectedRetailer, setSelectedRetailer] = useState(retailSellers[0]);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [error, setError] = useState("");
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   // Calculate estimated arrival date = today + 7 days
//   const getEstimatedArrival = () => {
//     const d = new Date();
//     d.setDate(d.getDate() + 7);
//     return d.toISOString().split("T")[0];
//   };
//   const [estimatedArrival] = useState(getEstimatedArrival());

//   // Calculate prices
//   const pricePerUnit = selectedCompany?.price || 0;
//   const subtotal = quantity * pricePerUnit;
//   const gstAmount = (subtotal * GST_PERCENTAGE) / 100;
//   const totalAmount = subtotal + gstAmount;

//   // Handle quantity change, allow only positive integers
//   const handleQuantityChange = (e) => {
//     const val = e.target.value;
//     if (val === "" || /^[1-9][0-9]*$/.test(val)) {
//       setQuantity(val === "" ? "" : Number(val));
//       setError("");
//     } else {
//       setError("Quantity must be a positive number");
//     }
//   };

//   // Handle payment submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!quantity || quantity <= 0) {
//       setError("Please enter a valid quantity greater than 0");
//       return;
//     }
//     if (!paymentMethod) {
//       setError("Please select a payment method");
//       return;
//     }
//     setError("");
//     // Simulate payment processing
//     setTimeout(() => {
//       setPaymentSuccess(true);
//     }, 1000);
//   };

//   if (!medicine.name) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
//         <h1 className="text-3xl font-semibold text-gray-700 mb-6">
//           No Medicine Selected
//         </h1>
//         <button
//           onClick={() => navigate("/admin/restock")}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-md transition"
//         >
//           Go Back to Restock
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
//       <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
//         Restock Medicine - {medicine.name}
//       </h1>

//       {!paymentSuccess ? (
//         <form onSubmit={handleSubmit} className="space-y-10">
//           {/* Company & Quantity Row */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
//             {/* Company Select */}
//             <div>
//               <label
//                 htmlFor="company"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Select Company
//               </label>
//               <select
//                 id="company"
//                 value={selectedCompany.id}
//                 onChange={(e) =>
//                   setSelectedCompany(
//                     defaultCompanies.find((c) => c.id === e.target.value)
//                   )
//                 }
//                 className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 {defaultCompanies.map((comp) => (
//                   <option key={comp.id} value={comp.id}>
//                     {comp.name} (₹{comp.price})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Quantity */}
//             <div>
//               <label
//                 htmlFor="quantity"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Quantity to Restock
//               </label>
//               <input
//                 type="number"
//                 id="quantity"
//                 min="1"
//                 step="1"
//                 value={quantity}
//                 onChange={handleQuantityChange}
//                 className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter quantity"
//                 required
//               />
//             </div>

//             {/* Retail Seller */}
//             <div>
//               <label
//                 htmlFor="retailer"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Retail Seller
//               </label>
//               <select
//                 id="retailer"
//                 value={selectedRetailer.id}
//                 onChange={(e) =>
//                   setSelectedRetailer(
//                     retailSellers.find((r) => r.id === e.target.value)
//                   )
//                 }
//                 className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 {retailSellers.map((retailer) => (
//                   <option key={retailer.id} value={retailer.id}>
//                     {retailer.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Estimated Arrival */}
//           <div className="max-w-md mx-auto">
//             <label
//               htmlFor="arrival"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Estimated Arrival Date
//             </label>
//             <input
//               type="date"
//               id="arrival"
//               value={estimatedArrival}
//               readOnly
//               className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 cursor-not-allowed"
//             />
//           </div>

//           {/* Bill Summary */}
//           <div className="max-w-md mx-auto bg-gray-50 border border-gray-200 rounded-md p-6 shadow-inner">
//             <div className="flex justify-between mb-2">
//               <span className="font-medium text-gray-700">Subtotal</span>
//               <span className="font-semibold text-gray-900">
//                 ₹{subtotal.toFixed(2)}
//               </span>
//             </div>
//             <div className="flex justify-between mb-2">
//               <span className="font-medium text-gray-700">
//                 GST ({GST_PERCENTAGE}%)
//               </span>
//               <span className="font-semibold text-gray-900">
//                 ₹{gstAmount.toFixed(2)}
//               </span>
//             </div>
//             <hr className="my-4 border-gray-300" />
//             <div className="flex justify-between font-extrabold text-indigo-700 text-xl">
//               <span>Total Amount</span>
//               <span>₹{totalAmount.toFixed(2)}</span>
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div className="max-w-md mx-auto">
//             <label className="block mb-4 text-lg font-semibold text-gray-700">
//               Payment Method
//             </label>
//             <div className="grid grid-cols-2 gap-4">
//               {paymentMethods.map(({ id, label }) => (
//                 <label
//                   key={id}
//                   htmlFor={id}
//                   className={`cursor-pointer rounded-lg border px-4 py-3 text-center font-medium transition
//                   ${
//                     paymentMethod === id
//                       ? "bg-indigo-600 text-white border-indigo-600 shadow-lg"
//                       : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     id={id}
//                     name="paymentMethod"
//                     value={id}
//                     checked={paymentMethod === id}
//                     onChange={() => setPaymentMethod(id)}
//                     className="hidden"
//                   />
//                   {label}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <p className="text-center text-red-600 font-semibold">{error}</p>
//           )}

//           {/* Submit Button */}
//           <div className="max-w-md mx-auto">
//             <button
//               type="submit"
//               className="w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-lg"
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         </form>
//       ) : (
//         // Payment Success & Bill Display
//         <div className="max-w-3xl mx-auto bg-green-50 border border-green-400 rounded-lg p-8 text-center shadow-lg">
//           <h2 className="text-3xl font-bold mb-6 text-green-800">
// Payment Successful!
// </h2>
// <p className="text-lg mb-6">Your restock order has been confirmed.</p>

//       <div className="bg-white p-6 rounded-lg shadow-inner max-w-md mx-auto text-left space-y-3">
//         <p>
//           <strong>Medicine:</strong> {medicine.name}
//         </p>
//         <p>
//           <strong>Company:</strong> {selectedCompany.name}
//         </p>
//         <p>
//           <strong>Quantity:</strong> {quantity}
//         </p>
//         <p>
//           <strong>Retail Seller:</strong> {selectedRetailer.name}
//         </p>
//         <p>
//           <strong>Estimated Arrival:</strong> {estimatedArrival}
//         </p>
//         <hr className="my-4" />
//         <p>
//           <strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}
//         </p>
//         <p>
//           <strong>GST ({GST_PERCENTAGE}%):</strong> ₹{gstAmount.toFixed(2)}
//         </p>
//         <p className="text-xl font-bold mt-4">
//           <strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}
//         </p>
//         <p>
//           <strong>Payment Method:</strong>{" "}
//           {
//             paymentMethods.find((method) => method.id === paymentMethod)
//               ?.label
//           }
//         </p>
        
//       </div>
//         <p className="text-center italic text-gray-500 mb-8">
//     Please take a screenshot of this page for future reference.
//   </p>
//     </div>
//   )}
// </div>
// );
// }

// export default RestockBill;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GST_PERCENTAGE = 18;

const defaultCompanies = [
  { id: "c1", name: "Sun Pharma", price: 50 },
  { id: "c2", name: "Cipla", price: 45 },
  { id: "c3", name: "Dr. Reddy's", price: 55 },
];

const retailSellers = [
  { id: "r1", name: "Apollo Pharmacy" },
  { id: "r2", name: "MedPlus" },
  { id: "r3", name: "Netmeds" },
  { id: "r4", name: "1mg" },
];

const paymentMethods = [
  { id: "razorpay", label: "Razorpay" },
  { id: "upi", label: "UPI" },
  { id: "netbanking", label: "Net Banking" },
  { id: "cod", label: "Cash on Delivery (COD)" },
];

// Helper to generate random order ID
function generateOrderId() {
  // Example: "ORD-1234567890" (10 digits random)
  return "ORD-" + Math.floor(1000000000 + Math.random() * 9000000000);
}

function RestockBill() {
  const location = useLocation();
  const navigate = useNavigate();

  const { medicine = {} } = location.state || {};

  const [quantity, setQuantity] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState(defaultCompanies[0]);
  const [selectedRetailer, setSelectedRetailer] = useState(retailSellers[0]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderId, setOrderId] = useState(""); // <-- new state for order ID

  // Calculate estimated arrival date = today + 7 days
  const getEstimatedArrival = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  };
  const [estimatedArrival] = useState(getEstimatedArrival());

  // Calculate prices
  const pricePerUnit = selectedCompany?.price || 0;
  const subtotal = quantity * pricePerUnit;
  const gstAmount = (subtotal * GST_PERCENTAGE) / 100;
  const totalAmount = subtotal + gstAmount;

  // Handle quantity change, allow only positive integers
  const handleQuantityChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^[1-9][0-9]*$/.test(val)) {
      setQuantity(val === "" ? "" : Number(val));
      setError("");
    } else {
      setError("Quantity must be a positive number");
    }
  };

  // Handle payment submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantity || quantity <= 0) {
      setError("Please enter a valid quantity greater than 0");
      return;
    }
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }
    setError("");
    // Simulate payment processing
    setTimeout(() => {
      // Generate order ID on successful payment
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);
      setPaymentSuccess(true);
    }, 1000);
  };

  if (!medicine.name) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6">
          No Medicine Selected
        </h1>
        <button
          onClick={() => navigate("/admin/restock")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-md transition"
        >
          Go Back to Restock
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Restock Medicine - {medicine.name}
      </h1>

      {!paymentSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Company & Quantity Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Company Select */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Company
              </label>
              <select
                id="company"
                value={selectedCompany.id}
                onChange={(e) =>
                  setSelectedCompany(
                    defaultCompanies.find((c) => c.id === e.target.value)
                  )
                }
                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {defaultCompanies.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.name} (₹{comp.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quantity to Restock
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                step="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter quantity"
                required
              />
            </div>

            {/* Retail Seller */}
            <div>
              <label
                htmlFor="retailer"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Retail Seller
              </label>
              <select
                id="retailer"
                value={selectedRetailer.id}
                onChange={(e) =>
                  setSelectedRetailer(
                    retailSellers.find((r) => r.id === e.target.value)
                  )
                }
                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {retailSellers.map((retailer) => (
                  <option key={retailer.id} value={retailer.id}>
                    {retailer.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Estimated Arrival */}
          <div className="max-w-md mx-auto">
            <label
              htmlFor="arrival"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Estimated Arrival Date
            </label>
            <input
              type="date"
              id="arrival"
              value={estimatedArrival}
              readOnly
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 cursor-not-allowed"
            />
          </div>

          {/* Bill Summary */}
          <div className="max-w-md mx-auto bg-gray-50 border border-gray-200 rounded-md p-6 shadow-inner">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">Subtotal</span>
              <span className="font-semibold text-gray-900">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">
                GST ({GST_PERCENTAGE}%)
              </span>
              <span className="font-semibold text-gray-900">
                ₹{gstAmount.toFixed(2)}
              </span>
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="flex justify-between font-extrabold text-indigo-700 text-xl">
              <span>Total Amount</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="max-w-md mx-auto">
            <label className="block mb-4 text-lg font-semibold text-gray-700">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map(({ id, label }) => (
                <label
                  key={id}
                  htmlFor={id}
                  className={`cursor-pointer rounded-lg border px-4 py-3 text-center font-medium transition
                  ${
                    paymentMethod === id
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-lg"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    id={id}
                    name="paymentMethod"
                    value={id}
                    checked={paymentMethod === id}
                    onChange={() => setPaymentMethod(id)}
                    className="hidden"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-center text-red-600 font-semibold">{error}</p>
          )}

          {/* Submit Button */}
          <div className="max-w-md mx-auto">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-lg"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      ) : (
        // Payment Success & Bill Display
        <div className="max-w-3xl mx-auto bg-green-50 border border-green-400 rounded-lg p-8 text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-green-800">
            Payment Successful!
          </h2>
          <p className="text-lg mb-6">Your restock order has been confirmed.</p>

          <div className="bg-white p-6 rounded-lg shadow-inner max-w-md mx-auto text-left space-y-3">
            <p>
              <strong>Order ID:</strong> {orderId}
            </p>
            <p>
              <strong>Medicine:</strong> {medicine.name}
            </p>
            <p>
              <strong>Company:</strong> {selectedCompany.name}
            </p>
            <p>
              <strong>Quantity:</strong> {quantity}
            </p>
            <p>
              <strong>Retail Seller:</strong> {selectedRetailer.name}
            </p>
            <p>
              <strong>Estimated Arrival:</strong> {estimatedArrival}
            </p>
            <hr className="my-4" />
            <p>
              <strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}
            </p>
            <p>
              <strong>GST ({GST_PERCENTAGE}%):</strong> ₹{gstAmount.toFixed(2)}
            </p>
            <p className="text-xl font-bold mt-4">
              <strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}
            </p>
            <p>
              <strong>Payment Method:</strong>{" "}
              {
                paymentMethods.find((method) => method.id === paymentMethod)
                  ?.label
              }
            </p>
          </div>
          <p className="text-center italic text-gray-500 mb-8">
            Please take a screenshot of this page for future reference.
          </p>
        </div>
      )}
    </div>
  );
}

export default RestockBill;
