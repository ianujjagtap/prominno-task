# Exhaustive Technical Documentation & Interview Guide

This document is designed to give you a deep, structural understanding of the backend system. It explains *what* we built, *how* it works internally, and *why* we made specific architectural decisions. 

Use this guide to confidently explain the codebase to an interviewer.

---

## 1. PROJECT OVERVIEW

### What the System Does
This is a secure, RESTful API built for a **Seller & Product Management** platform. It allows:
1. **Admins** to create Sellers.
2. **Sellers** to log in, manage their profiles, and create/manage Products.
3. Products can have multiple **Brands**, and each brand can have its own image.
4. Anyone can view a dynamically generated **PDF brochure** for a specific product.

### Problem the System Solves
It provides a robust, scalable backend template for e-commerce or directory platforms, focusing heavily on **data integrity, security, and developer experience**. It solves common issues like orphaned file uploads, insecure direct object references, and callback hell by using modern Node.js patterns.

### High-Level Architecture
The system uses a **Modular, Feature-Based Architecture**. Instead of grouping files by type (e.g., all controllers in one folder), files are grouped by feature (e.g., `src/modules/products/` contains the routes, controller, service, schema, and model for products). This makes it highly scalable and easier to maintain.

### Key Design Principles
1. **Separation of Concerns:** Controllers handle HTTP (`req/res`), Services handle business logic.
2. **Fail Fast:** Zod validation runs *before* controllers execute. If data is bad, the request is immediately rejected.
3. **Double Error Safety:** Using both a global route wrapper (`asyncHandler`) and internal `try-catch` blocks with explicit checks (`catchAsync`) to absolutely guarantee the server never crashes from unhandled promise rejections.

---

## 2. COMPLETE TECH STACK ANALYSIS

### Node.js & Express.js
- **What it is:** Node is the JS runtime; Express is the minimalist web framework.
- **Why it is used:** Ideal for I/O heavy, scalable, and stateless API services.
- **Where it appears:** Everywhere. `src/app.js` is the central Express setup.

### Native ES Modules (ESM)
- **What it is:** The modern JavaScript module system (`import`/`export`) instead of legacy CommonJS (`require`).
- **Why it is used:** Better performance, strict mode by default, and future-proofing.
- **Where it appears:** `package.json` (`"type": "module"`) and the custom loader (`src/register.js` & `src/loader.js`) which allows absolute path imports like `import X from "@/utils/X"`.

### Mongoose (MongoDB ORM)
- **What it is:** An Object Data Modeling (ODM) library for MongoDB.
- **Why it is used:** Enforces schema structure at the application level before data hits the NoSQL database.
- **Where it appears:** All `.model.js` files (e.g., `src/modules/sellers/sellers.model.js`). 

### Zod (Validation Library)
- **What it is:** A TypeScript-first schema declaration and validation library.
- **Why it is used:** To ensure incoming request data (`req.body`, `req.query`, `req.params`) is strictly typed and formatted securely.
- **Where it appears:** `src/middleware/validate.middleware.js` and all `.schema.js` files.

### JWT & bcryptjs (Authentication)
- **What it is:** JSON Web Tokens for stateless sessions; bcrypt for password hashing.
- **Why it is used:** JWT allows us to verify users without querying the database for every request. bcrypt ensures passwords are never stored in plain text.
- **Where it appears:** `src/middleware/auth.middleware.js` and `src/modules/auth/auth.service.js`.

### Helmet & Express Rate Limit (Security)
- **What it is:** Security middleware.
- **Why it is used:** `helmet` sets secure HTTP headers (like CSP). `rate-limit` prevents brute-force attacks.
- **Where it appears:** `src/app.js`.

### Multer (File Uploads)
- **What it is:** Middleware for handling `multipart/form-data`.
- **Why it is used:** We need to parse incoming form data that contains both regular text (JSON strings) and binary files (Brand images).
- **Where it appears:** `src/middleware/upload.middleware.js`.

---

### 🚨 SPECIAL FOCUS: PDF Generation (`pdfkit`)

- **Library Chosen:** `pdfkit`
- **Why it was chosen:** It is a powerful, low-level PDF generation library for Node.js. Unlike HTML-to-PDF generators (like Puppeteer) which require a heavy headless browser (Chromium) and use massive amounts of memory, `pdfkit` is extremely fast, lightweight, and generates native vectors directly.
- **How it works internally:** It provides an API to "draw" elements (text, graphics, images) onto a canvas coordinate system, and streams the output byte-by-byte.
- **How the project integrates with it:**
  We use a **Streaming Architecture**. We do *not* generate the PDF, save it to the hard drive, and then send it to the user. That would waste disk space and incur slow I/O operations. Instead, we pipe the generator output directly to the Express `res` (Response) stream.

**Key File:** `src/pdf/productPdf.js`

**Important snippet:**
```javascript
export const streamProductPdf = (product, res) => {
  if (!product) throw new Error(messages.PRODUCT_DATA_REQUIRED);

  try {
    const doc = new PDFDocument({ margin: 50 });

    // Tell the browser to expect a stream of PDF data
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${product.productName}.pdf"`);
    
    // Connect the PDF generator directly to the HTTP response
    doc.pipe(res);

    // ... draw text ...

    for (const brand of product.brands) {
      const imgPath = path.join(process.cwd(), brand.imageUrl || "");
      if (brand.imageUrl && fs.existsSync(imgPath)) {
        try {
          doc.image(imgPath, { width: 80 }); // Embed local images into PDF
        } catch {
          // skipping broken images to prevent the whole stream from crashing
        }
      }
    }

    doc.end(); // Closes the stream, finalizing the request
  } catch (error) {
    throw error;
  }
};
```

---

## 3. PROJECT STRUCTURE BREAKDOWN

```text
src/
├── config/           # Setup for environment variables, DB, and Swagger docs.
├── constants/        # Centralized static strings (messages, error codes).
├── middleware/       # Express midlewares (auth, validation, file uploads, global errors).
├── modules/          # Feature-based folders (Auth, Sellers, Products).
├── pdf/              # Core logic for PDF generation.
├── utils/            # Helper functions (API response formatter, async wrappers).
├── app.js            # Main Express application assembly.
├── server.js         # Entry point: Connects DB, seeds Admin, starts listening.
├── register.js       # Hooks into Node to enable ESM absolute pathing.
└── loader.js         # The actual logic that resolves '@/...' to './src/...'.
```

### Module Breakdown (e.g., `src/modules/products/`)
Inside a feature module, logic is strictly divided:
- **`products.routes.js`**: Maps HTTP verbs (GET, POST) to Controllers. Holds Swagger docs.
- **`products.controller.js`**: Extracts data from `req` and passes it to the Service. Returns the HTTP response.
- **`products.service.js`**: The **Brain**. Contains raw business logic, database calls, and explicit validations.
- **`products.model.js`**: Mongoose database schema.
- **`products.schema.js`**: Zod validation shapes.

---

## 4. REQUEST FLOW EXPLANATION

Let's trace what happens when a Seller creates a Product with images:
`POST /api/v1/products`

1. **Client Request:** Mobile app/Frontend sends `multipart/form-data` with text and images.
2. **Auth Middleware (`authenticate`):** Extracts JWT from headers, verifies it, and attaches `{ id, role }` to `req.user`.
3. **Role Middleware (`requireRole`):** Checks if `req.user.role === "seller"`. If not, throws HTTP 403 Forbidden.
4. **Upload Middleware (`uploadBrandImages`):** `multer` intercepts the stream, saves the images to actual `/uploads` files on disk, and puts file info in `req.files`.
5. **Validation Middleware (`validate`):** Zod intercepts `req.body`. It checks if `productName` is a string, and importantly, it parses the `brands` JSON string back into a JS array. The *sanitized, validated data* is assigned to `req.valid.body`. The controller is completely shielded from bad data.
6. **Controller (`createProductController`):** Pulls safe data from `req.valid.body` and calls the Service.
7. **Service Layer (`products.service.js`):** Checks inputs defensively (`if (!data) throw Error`), constructs the final DB object by mapping the saved `req.files` filenames to their exact index in the `brands` array.
8. **Database:** `Product.create()` inserts the document into MongoDB Atlas.
9. **Response:** Controller sends back `successResponse` with HTTP 201 Created.

---

## 5. FILE BY FILE CODE EXPLANATION

### File: `src/middleware/validate.middleware.js`
**Purpose:** Global input sanitizer and guard.
**How it works:**
```javascript
const validate = (schema, target = "body") => (req, _res, next) => {
  // safeParse prevents throwing exceptions if validation fails
  const result = schema.safeParse(req[target]); 
  
  if (!result.success) {
    // If invalid, pass the Zod error immediately to the global error handler
    return next(result.error);
  }
  
  // CRITICAL INTERVIEW POINT: 
  // We do not mutate req.body. In some environments req.body is read-only.
  // Instead, we create a guaranteed-safe 'req.valid' object containing EXACTLY 
  // what Zod parsed (stripping out malicious extra fields).
  req.valid = req.valid || {};
  req.valid[target] = result.data;
  
  next();
};
```

### File: `src/utils/asyncHandler.js` & `catchAsync.js`
**Purpose:** Guaranteed error catching.
**Interview Explanation:** 
"In traditional Express, if an `async` function throws an error and you forgot a try-catch, the server crashes. We built a global `asyncHandler` that wraps every route. If any promise rejects, it automatically catches it and forwards it to `next(error)`, ensuring the server stays alive and the user gets a 500 JSON response."

### File: `src/modules/products/products.service.js`
**Purpose:** The business logic for products.
**Important Logic: File Cleanup upon Deletion**
```javascript
export const deleteProduct = catchAsync(async (productId, sellerId) => {
  // ... basic existence / auth checks ...

  // To prevent disk bloat, we don't just delete the database record.
  // We loop over the brands first, locate the physical image file on disk,
  // and unlink (delete) it from the server's filesystem.
  for (const brand of product.brands) {
    if (brand.imageUrl) {
      const imagePath = path.join(process.cwd(), brand.imageUrl);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
  }

  await Product.findByIdAndDelete(productId);
  return { message: messages.PRODUCT_DELETED };
});
```
*Why this matters for the interview:* It demonstrates senior-level thinking. Junior developers delete the DB record and leave orphaned images filling up the server's hard drive until it crashes. By ensuring the physical files are deleted in tandem with the DB record, you show production-readiness.
