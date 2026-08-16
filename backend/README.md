# Book Publisher Platform Backend

Production-grade NestJS & TypeScript API backend for the 3-volume hardcover book set ***"Essentials of Medical Device Clinical Research"*** by Dr. Ashish Indani.

---

## Technical Features & Architecture

- **Framework**: Node.js v20 + NestJS (Modular Architecture: `controller -> service -> repository`)
- **Database & ORM**: PostgreSQL with Prisma ORM (relational integrity, migrations, seeders, soft-deletes)
- **Authentication**: JWT Access & Refresh token strategy, bcrypt password hashing, SMS OTP verification flow
- **Dual Buyer Support**:
  1. **Individual Buyers**: Standard e-commerce Razorpay checkout
  2. **Institutional Buyers**: Librarians & procurement authorities (1400+ medical colleges), PO upload workflow, `PENDING_APPROVAL` status pipeline, bank transfer & TDS reconciliation tracking
- **Dynamic Bulk Discount Engine**: Configurable DB-driven tiered discount rules (1-4 sets standard, 5-19 sets 10% off, 20+ sets 20% off)
- **India GST Compliance**:
  - HSN 4901 printed books 0% GST (config-driven)
  - Proforma Invoice & Final Tax Invoice two-step flow
  - GSTIN capture for institutional buyers
  - E-invoicing IRN & QR code hooks
- **Strict Notification Channel Rules**:
  - **SMS (MSG91 / Twilio)**: Used strictly for **Login OTP** and **Order Confirmation** (high open rates).
  - **Email (SendGrid)**: Used **EXCLUSIVELY** for delivering the generated Invoice PDF attachment.
- **In-House Invoicing Engine**: `pdf-lib` PDF generator, GCS/local file storage, background job trigger
- **Payments & Webhooks**: Razorpay webhook signature verification with idempotency replay handling
- **API Documentation**: Auto-generated interactive Swagger OpenAPI spec at `/api/docs`
- **Deployment**: GCP Cloud Run multi-stage `Dockerfile`, GitHub Actions CI/CD (`.github/workflows/deploy.yml`)

---

## Getting Started

### 1. Prerequisites
- Node.js >= 20.x
- PostgreSQL instance (or Cloud SQL)

### 2. Environment Setup
Copy `.env.example` to `.env` and fill in configuration variables:
```bash
cp .env.example .env
```

### 3. Installation
```bash
npm install
```

### 4. Database Migration & Seeding
```bash
npx prisma generate
npx prisma db push
npm run prisma:seed
```

### 5. Running the Application
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### 6. Interactive OpenAPI Swagger Docs
Open `http://localhost:8080/api/docs` in your browser.

---

## Testing

```bash
# Unit tests (Tiered bulk discount & pricing engine)
npm run test

# E2E Integration tests (Razorpay webhook & idempotency)
npm run test:e2e
```

---

## Project Structure

```
book_publisher/
├── .github/workflows/deploy.yml   # GCP Cloud Run GitHub Actions CI/CD
├── prisma/
│   ├── schema.prisma              # Production database schema
│   └── seed.ts                    # Product catalog & admin seeder
├── src/
│   ├── common/                    # Standard Interceptors & Exception Filters
│   ├── database/                  # Prisma service & module
│   ├── modules/
│   │   ├── admin/                 # Dashboard metrics, manual overrides, TDS tracking
│   │   ├── auth/                  # JWT auth, SMS OTP, Refresh tokens
│   │   ├── cart/                  # Dynamic tiered bulk discount engine
│   │   ├── invoices/              # In-house pdf-lib PDF invoice generator
│   │   ├── leads/                 # Institutional inquiries pipeline
│   │   ├── notifications/         # SMS & SendGrid email providers
│   │   ├── orders/                # Individual & Institutional PO workflows
│   │   ├── payments/              # Razorpay webhook verification & idempotency
│   │   ├── products/              # Catalog management
│   │   └── storage/               # File storage abstraction
│   ├── app.module.ts
│   └── main.ts                    # Swagger, CORS & bootstrap
├── postman/
│   └── book_publisher_api.postman_collection.json
├── Dockerfile
├── .env.example
└── package.json
```
