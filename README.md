# Seller & Product Management API

A modern Node.js backend for managing sellers and their products, featuring on-the-fly PDF generation and secure image uploads.

## Features

- **ESM-First**: Built with native Node.js ES modules.
- **Path Aliases**: Clean imports using `@/` aliases.
- **Auto-Seeding**: Automatic admin user creation on first run.
- **Authentication**: Role-based access control (Admin & Seller).
- **Product Management**: Support for multiple brands and images per product.
- **PDF Generation**: Live streaming of product brochures with automatic price calculation.
- **API Documentation**: Integrated Swagger UI at `/api-docs`.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Validation**: Zod
- **Documentation**: Swagger (OpenAPI 3.0)
- **PDF Engine**: PDFKit
- **File Uploads**: Multer

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Running locally or on Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your `.env` file (copied from `.env.example`):
   ```text
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/backend_task
   JWT_SECRET=your_secret_key
   ADMIN_EMAIL=admin@backend.com
   ADMIN_PASSWORD=admin12345678
   ```

### Running the App

- **Development mode**:
  ```bash
  npm run dev
  ```
- **Production mode**:
  ```bash
  npm start
  ```

## Deployment

This project is ready to be deployed on **Render** using **MongoDB Atlas**.

### 1. Database Setup (MongoDB Atlas)

1.  Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2.  Create a new Shared Cluster (Free).
3.  Add a Database User (Username & Password).
4.  Add your IP (or `0.0.0.0/0`) to the IP Access List.
5.  Get your Connection String (`mongodb+srv://...`).

### 2. Deploy on Render

1.  Create a New **Web Service** on [Render](https://render.com).
2.  Connect this GitHub repository.
3.  Settings:
    - **Runtime**: Node
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
4.  Add **Environment Variables**:
    - `NODE_ENV`: `production`
    - `MONGODB_URI`: *Your Atlas Connection String*
    - `JWT_SECRET`: *A secure random string*
    - `ADMIN_EMAIL`: `admin@backend.com`
    - `ADMIN_PASSWORD`: `your_secure_password`

### 3. File Persistence Note

Render's disk is ephemeral. For production use, consider using a Cloudinary or S3 integration for image uploads, or attach a persistent Render Disk to the `/uploads` directory.

