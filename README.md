# Seller & Product Management API

> A high-performance, production-ready Node.js backend for managing sellers and products — featuring secure JWT authentication, role-based access control, multi-brand product management with image uploads, and real-time PDF generation.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [Live Deployment](#live-deployment)
- [Acknowledgements](#acknowledgements)

---

## Overview

This project is a fully-featured REST API backend built with Node.js and Express.js. It provides a clean, scalable architecture for managing sellers and their associated products, with strict role-based access control, robust validation, and automated admin provisioning for zero-config first runs.

---

## Key Features

**Modern Architecture**
Pure ES Modules (ESM) throughout the codebase, with `@/` path aliasing for clean, maintainable imports.

**Role-Based Security**
Strict access control separates Admin capabilities (seller management) from Seller capabilities (product management), enforced via JWT middleware.

**Advanced Product Management**
Dynamic multi-brand support per product, multi-file image uploads via Multer, and automatic disk cleanup of associated images upon product deletion.

**Live PDF Engine**
Real-time PDF generation with embedded images, custom branding, and automatic price calculations — powered by PDFKit.

**Robust Validation**
Type-safe request validation and sanitization using Zod schemas across all endpoints.

**Auto-Provisioning**
Automated Admin seeding from environment variables, enabling zero-config first runs in any environment.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5.x |
| Database | MongoDB via Mongoose |
| Authentication | JWT (JsonWebToken), BcryptJS |
| Security | Helmet, Express Rate Limit |
| File Uploads | Multer (disk storage) |
| PDF Generation | PDFKit |
| Validation | Zod |
| Documentation | Swagger UI, OpenAPI 3.0 |

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/ianujjagtap/prominno-task.git
cd prominno-task
npm install
```

### 2. Environment Configuration

Create a `.env` file in the project root with the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secure_secret
ADMIN_EMAIL=admin@backend.com
ADMIN_PASSWORD=your_secure_password
```

### 3. Run the Server

```bash
# Development (with hot-reloading)
npm run dev

# Production
npm start
```

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `PORT` | Port the server will listen on | Yes |
| `MONGODB_URI` | MongoDB Atlas connection string | Yes |
| `JWT_SECRET` | Secret key for signing JWTs | Yes |
| `ADMIN_EMAIL` | Email for the auto-seeded admin account | Yes |
| `ADMIN_PASSWORD` | Password for the auto-seeded admin account | Yes |

---

## Live Deployment

The API is live and fully operational. You can explore all endpoints interactively using the integrated Swagger UI — no local setup required.

**Base URL:** `https://prominno-task.onrender.com`

**Swagger Docs:** [https://prominno-task.onrender.com/api-docs/](https://prominno-task.onrender.com/api-docs/)

The Swagger interface lets you authenticate, send requests, and inspect responses directly in the browser.

> **Note:** The server may take 30–60 seconds to wake on first request if it has been idle (Render free-tier spin-down behavior).

---

## Acknowledgements

Thank you for taking the time to review this project. It was built with a focus on clean architecture, security best practices, and developer experience. Thanks for this opportunity 🙏
