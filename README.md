# CraftMart

A thesis e-commerce platform empowering local craftspeople. This repo contains:
- Admin site (PHP + HTML)
- Buyer SPA (Vite + React + TypeScript)
- Seller site (standalone HTML pages; PHP APIs planned)

## Setup

### 1) Database
1. Start Apache and MySQL in XAMPP
2. Open `http://localhost/phpmyadmin`
3. Create database `db_craftmart`
4. Import `craftmart_database.sql`

Notes:
- `users` now includes KYC fields: `kyc_status` and `national_id_image`.
- A default admin user is inserted with email `admin@craftmart.com` and password `password`.

Optional: insert a demo seller (password is `password` using the same bcrypt hash as admin):
```sql
INSERT INTO users (email, password, first_name, last_name, phone, user_type, is_active, email_verified, kyc_status)
VALUES ('seller@craftmart.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Demo', 'Seller', '+63 900 000 0000', 'seller', TRUE, TRUE, 'approved');
```

### 2) Buyer Frontend (React)
1. In a terminal at project root: `npm install`
2. Start dev server: `npm run dev`
3. Open the shown local URL (typically `http://localhost:5173`) for the buyer UI.

### 3) Admin Site (PHP)
- Admin Login: `http://localhost/craftmart_projct/admin/index.html`
- Admin Dashboard: `http://localhost/craftmart_projct/admin/dashboard.html`

Default admin credentials:
- Email: `admin@craftmart.com`
- Password: `password`

### 4) Seller Site
- Seller Login Page: `http://localhost/craftmart_projct/seller/index.html`
- “Become a Seller” button is visible in the site footer and links to the seller page.

Planned/ongoing:
- Seller signup page with KYC uploads (profile picture and national ID) and pending review status.
- Admin review screen to approve/reject sellers and view uploaded ID image.

## Features (current)
- Admin authentication and dashboard shell
- Buyer SPA with categories, products, seller profiles, cart/checkout pages (mock data)
- Footer CTA linking to seller portal

## Security Notes
- Change default passwords on first run.
- Do not store raw ID images in web-accessible paths in production; use protected storage and signed URLs.

## Project Structure (excerpt)
```
admin/
  index.html
  dashboard.html
  api/
    login.php
seller/
  index.html
src (React root is project root with Vite):
  App.tsx, components/, context/
```

## Next Steps
- Implement seller signup (`seller/signup.html`) with file uploads (profile and national ID) and API to create `users` with `kyc_status='pending'` and `seller_profiles` row.
- Add admin UI to review seller applications (view ID image) and approve/reject, updating `kyc_status` and `is_verified`.
- Hook buyer SPA to real APIs for products, auth, and orders.
