# Seller & Product Management API 🚀

A high-performance, production-ready Node.js backend for managing sellers and products. This project features secure authentication, multi-brand product management with image uploads, and on-the-fly PDF generation.

---

## 📖 Live API Documentation

The most efficient way to explore and test the APIs is through the integrated **Swagger UI**. 

Once the server is running, access it at:
👉 **`http://localhost:3000/api-docs`**

*Note: For deployed versions, replace `localhost:3000` with the deployment URL.*

---

## ✨ Key Features

- **Modern Architecture**: Pure ES Modules (ESM) with `@/` path aliasing for clean, maintainable imports.
- **Role-Based Security**: Strict access control for Admins (Seller management) and Sellers (Product management).
- **Advanced Product Management**: 
  - Dynamic multi-brand support per product.
  - Multi-file image uploads via Multer.
  - Automatic disk cleanup of associated images upon product deletion.
- **Live PDF Engine**: Real-time PDF generation with embedded images, custom branding, and automatic price calculations.
- **Robust Validation**: Type-safe request validation and sanitization using **Zod**.
- **Auto-Provisioning**: Automated Admin seeding from environment variables for zero-config first runs.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js (v5.x)
- **Database**: MongoDB via Mongoose
- **Security**: JWT (JsonWebToken), BcryptJS, Helmet, Express Rate Limit
- **Storage**: disk storage (Multer)
- **PDF**: PDFKit
- **Docs**: Swagger UI, OpenAPI 3.0

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/ianujjagtap/prominno-task.git
cd prominno-task
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root:
```text
PORT=3000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secure_secret
ADMIN_EMAIL=admin@backend.com
ADMIN_PASSWORD=your_secure_password
```

### 3. Run
- **Development**: `npm run dev` (with hot-reloading)
- **Production**: `npm start`
