# CraftMart

A thesis e-commerce platform empowering local craftspeople. This project is organized into backend and frontend folders.

## Project Structure
```
craftmart_projct/
├── backend/           # PHP backend (Admin & Seller sites)
│   ├── admin/        # Admin dashboard
│   ├── seller/       # Seller portal
│   ├── api/          # Shared APIs
│   ├── logo/         # Assets
│   └── craftmart_database.sql
├── frontend/         # React frontend (Buyer SPA)
│   ├── components/
│   ├── context/
│   ├── App.tsx
│   └── package.json
└── README.md
```

## Setup Instructions

### 1) Database Setup
1. Start Apache and MySQL in XAMPP
2. Open `http://localhost/phpmyadmin`
3. Create database `db_craftmart`
4. Import `backend/craftmart_database.sql`

Notes:
- `users` table includes KYC fields: `kyc_status` and `national_id_image`
- Default admin: `admin@craftmart.com` / `password`

Optional demo seller:
```sql
INSERT INTO users (email, password, first_name, last_name, phone, user_type, is_active, email_verified, kyc_status)
VALUES ('seller@craftmart.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Demo', 'Seller', '+63 900 000 0000', 'seller', TRUE, TRUE, 'approved');
```

### 2) Frontend (Buyer SPA) - React + TypeScript
```bash
cd frontend
npm install
npm run dev
```
- Opens at `http://localhost:5173`
- Features: Product browsing, cart, checkout, seller profiles

### 3) Backend (Admin & Seller Sites) - PHP
The backend runs directly through XAMPP Apache:

**Admin Site:**
- Login: `http://localhost/craftmart_projct/backend/admin/index.html`
- Dashboard: `http://localhost/craftmart_projct/backend/admin/dashboard.html`
- Credentials: `admin@craftmart.com` / `password`

**Seller Site:**
- Login: `http://localhost/craftmart_projct/backend/seller/index.html`
- Signup: `http://localhost/craftmart_projct/backend/seller/signup.html`
- Dashboard: `http://localhost/craftmart_projct/backend/seller/dashboard.html`

## How to Run Everything

### Option 1: Run Both (Recommended)
1. **Start XAMPP** (Apache + MySQL)
2. **Terminal 1 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
3. **Access URLs:**
   - Buyer site: `http://localhost:5173`
   - Admin: `http://localhost/craftmart_projct/backend/admin/`
   - Seller: `http://localhost/craftmart_projct/backend/seller/`

### Option 2: Backend Only
- Just start XAMPP and access the PHP sites directly
- No npm commands needed for backend

### Option 3: Frontend Only (Development)
- Run `cd frontend && npm run dev` for React development
- Note: Some features need backend APIs

## Features
- **Buyer SPA**: Product browsing, cart, seller profiles
- **Admin Dashboard**: User management, seller approval, analytics
- **Seller Portal**: Login, signup with KYC, dashboard
- **KYC System**: Profile picture + national ID upload, admin review

## Security Notes
- Change default passwords on first run
- In production, secure file uploads and use proper authentication
