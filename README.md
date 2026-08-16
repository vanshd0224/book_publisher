# Book Publisher Platform - Fullstack Monorepo

Complete production-grade e-commerce application for ***"Essentials of Medical Device Clinical Research"*** (3-Volume Hardcover Book Set) by Dr. Ashish Indani.

---

## Monorepo Layout

```
book_publisher/
├── backend/
│   ├── src/                       # NestJS API controllers, services, modules
│   ├── prisma/                    # PostgreSQL schema & migration seeders
│   ├── Dockerfile                 # GCP Cloud Run multi-stage build
│   ├── .env.example               # Backend env variables (DATABASE_URL, RAZORPAY, SENDGRID)
│   └── package.json
│
├── frontend/
│   ├── src/                       # Next.js React pages, components, & API client
│   ├── public/                    # Static assets
│   ├── .env.example               # Frontend env variables (NEXT_PUBLIC_API_BASE_URL)
│   ├── next.config.js
│   └── package.json
│
├── .github/
│   └── workflows/
│       ├── deploy-backend.yml     # CI/CD trigger on backend/ changes
│       └── deploy-frontend.yml    # CI/CD trigger on frontend/ changes
├── .gitignore
└── README.md
```

---

## Technical Features

### Backend (`/backend`)
- **Framework**: Node.js + NestJS (TypeScript)
- **Database**: PostgreSQL with Prisma ORM (relational integrity, migrations, seeders)
- **Dual Buyer Support**: Individual Razorpay checkout & Institutional PO upload workflow (`PENDING_APPROVAL` status)
- **Dynamic Bulk Discount Engine**: DB-driven tiered discount rules (1–4 sets 0%, 5–19 sets 10% off, 20+ sets 20% off)
- **India GST Compliance**: Printed books 0% GST (HSN 4901), Proforma & Final tax invoices
- **Strict Notifications**: SMS (MSG91/Twilio) for OTP & order confirmation; SendGrid Email EXCLUSIVELY for delivering invoice PDFs
- **OpenAPI**: Swagger UI available at `/api/docs`

### Frontend (`/frontend`)
- **Framework**: Next.js 14 + React + TypeScript + Tailwind CSS
- **REST API Integration**: Seamless 1:1 mapping with NestJS backend routes (`/api/v1/auth`, `/api/v1/products`, `/api/v1/cart`, `/api/v1/orders`, `/api/v1/leads`, `/api/v1/admin`)

---

## Local Development Instructions

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
npm run start:dev
```
Backend runs at: `http://localhost:8080` (Swagger UI: `http://localhost:8080/api/docs`)

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```
Frontend runs at: `http://localhost:3000`
