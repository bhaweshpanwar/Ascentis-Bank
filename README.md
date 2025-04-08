# Ascentis Bank

Ascentis Bank is a modern banking web application built with **React (Vite)**, **Material UI**, **Tailwind CSS**, and **Axios**. It offers a clean and user-friendly interface for users to manage their accounts, perform secure transactions, and explore banking services seamlessly. This project features complete authentication flows, a feature-rich dashboard, and clear documentation to ensure an optimal user experience.

---

## 🌐 Live Demo

[https://ascentis-bank.onrender.com](https://ascentis-bank.onrender.com)

---

## 📌 Project Highlights

### 🔹 Key Features

- **Authentication & Security**

  - User Registration and Login
  - OTP-secured Account-to-Account Transfers
  - Forgot Password functionality
  - Encrypted data handling

- **User Dashboard**

  - Auto Pay Setup
  - Secure Payments
  - Fixed Deposit Management
  - Account Settings
  - Account Closure Option

- **Account Types**

  - Savings Account
  - Current Account

- **Transaction Methods**

  - Account-to-Account Transfers
  - No support for UPI or Net Banking (by design)

- **Responsive UI**
  - Built using Material UI and Tailwind CSS for a seamless and modern look across devices

---

## 🧩 Tech Stack

| Technology   | Purpose                      |
| ------------ | ---------------------------- |
| React (Vite) | Frontend framework           |
| Material UI  | Pre-built UI components      |
| Tailwind CSS | Utility-first custom styling |
| Axios        | HTTP client for API requests |
| React Router | Page navigation and routing  |
| JSX          | Component-based architecture |

---

## 🧭 Pages & Components

### Pages:

- Home
- About
- Login / Register / Forgot Password
- Dashboard
  - Pay
  - Auto Pay
  - Fixed Deposits
  - Settings
  - Close Account
- Success & Error Screens

### Reusable Components:

- Header, Footer
- ChatBot
- FAQ
- User Info Display
- User Reviews

---

## 📂 Project Structure

```

src/
│
├── assets/
│ ├── components/ # Reusable components (ChatBot, Header, Footer, etc.)
│ └── Pages/ # Main page components (Dashboard, Login, etc.)
│
├── App.jsx # Main app component
├── main.jsx # React DOM render
├── config.js # API endpoints / configuration
├── index.css / App.css # Styling files
├── .env # Environment variables

```

---

## 🚀 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ascentis-bank.git
cd ascentis-bank
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The app will be live at: `http://localhost:5173`

---

## 🔐 Security Features

- OTP verification on all transactions
- Encrypted data transmission
- Safe handling of user credentials

---

## ❓ FAQs

- **How to send money?**  
  Use the "Pay" section in your dashboard. Enter account number and verify using OTP.

- **How to open a Fixed Deposit?**  
  Accessible directly via your dashboard.

- **Is UPI supported?**  
  No. Only account-to-account transfers with OTP verification are supported.

- **How to close the account?**  
  Use the "Close Account" feature or contact support.

---

## 📬 Contact & Support

For queries or issues:

- Email: [support@ascentisbank.com](mailto:support@ascentisbank.com)
- Website: [Ascentis Bank](https://ascentis-bank.onrender.com)

---

## 📄 License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute this software with proper attribution. See the [LICENSE](./LICENSE) file for more details.

```

```
