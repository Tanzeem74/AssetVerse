# 🏢 AssetVerse 
**AssetVerse** is a comprehensive Asset and Employee Management Platform designed to streamline how organizations track their equipment and manage their teams. Built with the MERN stack, it offers specialized interfaces for HR Managers and Employees.

## 🌐 Live Links
- **Live Site:** https://strong-paletas-fe9c75.netlify.app/
- **Server API:** https://asset-verse-server-lac.vercel.app/

---

## 🚀 Key Features

### 👤 For HR Managers
- **Dynamic Dashboard:** View asset distribution (Returnable vs. Non-returnable) via Pie Charts.
- **Asset Inventory:** Full CRUD operations on company assets with stock tracking.
- **Team Management:** Add employees to the company team and monitor their activities.
- **Package Upgrade:** Secure payment integration via **Stripe** to increase employee member limits.
- **Request Oversight:** Review, approve, or reject asset requests from employees.

### 👥 For Employees
- **Asset Requesting:** Browse and request available company assets.
- **My Assets:** Track the status of requests (Pending, Approved, Returned) and download PDF receipts.
- **Team View:** View all affiliated team members and company HR details.
- **Profile Customization:** Manage personal profile information and images.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, DaisyUI, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase Auth (with Custom Token Verification)
- **Payments:** Stripe API
- **State Management:** TanStack Query (React Query) & Axios

---

## 📦 Essential Packages Used
- `stripe`: For secure payment processing.
- `framer-motion`: For smooth UI animations.
- `react-router`: For seamless SPA navigation.
- `tanstack/react-query`: For efficient data fetching and caching.
- `firebase-admin`: For server-side token verification.
- `recharts`: For data visualization and analytics.
- `sweetalert2`: For interactive user notifications.

## ⚙️ Installation & Local Setup

1. **Clone the project:**
   ```bash
   git clone https://github.com/Tanzeem74/AssetVerse.git
   cd assetverse-client
   npm install
  '''
2. env setup
VITE_apiKey=your_firebase_key

VITE_authDomain=your_auth_domain

VITE_projectId=your_project_id

VITE_storageBucket=your_storage_bucket

VITE_messagingSenderId=your_sender_id

VITE_appId=your_app_id

3.Admin/Testing Credentials

HR Manager: admin@admin.com | Password: Admin7#

Employee: Vaia@gmail.com | Password: Tanzeem7#
