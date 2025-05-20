<h1> 🩺 Medikart: AI-Powered Medicine Platform</h1>

Medikart is a full-stack AI-powered web application that empowers users to detect potential skin diseases using a **TensorFlow CNN model**, purchase prescribed medicines online, and interact with verified doctors. The platform provides robust admin and doctor dashboards, secure authentication using JWT and bcrypt, and payment integration via Razorpay.

---

## ✨ Features

### 🧠 AI Skin Disease Detection
- Upload an image to detect potential skin diseases.
- Built using TensorFlow with a trained CNN model.
- Instant predictions with a user-friendly UI.

### 🛒 Medicine Purchase & Payment
- Buy prescribed medicines securely.
- Razorpay integration for seamless online payments.
- Prescription-based medicine approval system by doctors.

### 🩻 Doctor Panel
- Doctors can:
  - View patient prescription requests.
  - Approve/disapprove prescription medicines based on field specialization.
  - View request history and contact details.

### 🔐 Authentication & Security
- Secure JWT-based authentication for users, doctors, and admins.
- Passwords hashed using bcrypt.

### 🧑‍⚕️ Admin Dashboard
- Add and manage medicines.
- View and approve registered doctors.
- Restock out-of-stock medicines.
- View sales reports and analytics.

### 💬 Chatbot Integration
- Helpful AI chatbot assists users with medicine information and FAQs.
- Available on main user dashboard for 24/7 guidance.

---

## 🏗️ Tech Stack

### Frontend
- **React.js** (with Tailwind CSS and shadcn/ui)
- React Router
- Axios for API calls
- Framer Motion & Lucide icons

### Backend
- **Node.js**, **Express.js**
- MongoDB Atlas with Mongoose
- JWT Authentication & bcrypt
- GridFS for storing large image files
- Razorpay SDK for payment integration

### AI & ML
- TensorFlow & Keras
- Pretrained CNN model for skin disease classification

---

## 📂 Project Structure

```bash
Medikart/
│
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.tsx
│   └── package.json
│
├── server/                # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── models/
│   ├── utils/
│   └── index.js
│
├── model/                 # TensorFlow CNN model
│   └── skin_disease_model.h5
│
├── .env                   # Environment variables
├── README.md
└── package.json
🚀 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/yourusername/medikart.git
cd medikart
2. Setup Backend
bash
Copy
Edit
cd server
npm install
cp .env.example .env  # Add your Mongo URI, JWT secret, Razorpay keys here
npm start
3. Setup Frontend
bash
Copy
Edit
cd client
npm install
npm run dev
🧪 AI Model Training
CNN model trained on a labeled dataset of skin disease images.

TensorFlow + Keras pipeline with image augmentation and early stopping.

Accuracy: ~93%, Supports common diseases like Eczema, Psoriasis, Ringworm, etc.

🔐 Authentication Roles
User: Register/Login → Upload prescription → Buy medicine

Doctor: Login → Approve medicine → View approvals

Admin: Login → Manage medicines/doctors → Restock → View insights

💳 Razorpay Integration
Frontend securely calls backend to create a Razorpay order.

Payment success/failure handled on the client side.

Orders are stored in MongoDB for tracking and reporting.

📈 Admin Functionalities
Add, edit, delete medicines.

Restock low quantity medicines.

View registered doctors and update their status.

Track total sales and payment statuses.

Filter/sort/search doctors by specialization, license, or status.

🤖 Chatbot
Built-in chatbot helps answer:

“What is this medicine used for?”

“Can I use it with XYZ condition?”

“Where can I upload my prescription?”

Integrated via a simple React component and chatbot logic.

📌 Future Enhancements
Doctor video consultation.

Prescription image OCR for faster analysis.

SMS/Email notifications for medicine dispatch.

Medicine review and rating system.

📜 License
This project is licensed under the MIT License.

🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

📬 Contact
Developer: [Your Name]
Email: yourname@example.com
LinkedIn: linkedin.com/in/yourusername

⭐ Show Your Support
If you liked this project, leave a ⭐️ on GitHub!

yaml
Copy
Edit

---

Let me know if you'd like this customized for deployment (e.g., Docker, Vercel, EC2), or if you want help writing a `LICENSE`, `CONTRIBUTING.md`, or badges (e.g., build passing, contributors).

