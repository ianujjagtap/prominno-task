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

### API Documentation

Once the server is running, visit:
`http://localhost:3000/api-docs`

## License

MIT
