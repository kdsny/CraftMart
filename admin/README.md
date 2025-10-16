# CraftMart Admin Dashboard

## Setup Instructions

### 1. Database Setup
1. Open XAMPP and start Apache and MySQL services
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Create a new database named `db_craftmart`
4. Import the SQL file: `craftmart_database.sql`

### 2. Admin Login Credentials
- **Email**: admin@craftmart.com
- **Password**: password (default password from the SQL file)

### 3. File Structure
```
admin/
├── index.html          # Admin login page
├── dashboard.html      # Admin dashboard
├── api/
│   ├── login.php       # Authentication API
│   └── dashboard.php   # Dashboard data API
└── README.md           # This file
```

### 4. Access URLs
- **Admin Login**: http://localhost/craftmart_projct/admin/
- **Admin Dashboard**: http://localhost/craftmart_projct/admin/dashboard.html

### 5. Features
- **Authentication**: Secure admin login
- **Dashboard**: Overview of system statistics
- **User Management**: View and manage all users
- **Product Management**: View and manage all products
- **Order Management**: View and manage all orders
- **Category Management**: Manage product categories
- **System Settings**: Configure system parameters

### 6. Security Notes
- Change the default admin password after first login
- The system uses PHP sessions for authentication
- All API endpoints include basic security checks

### 7. Database Schema
The database includes tables for:
- Users (admin, seller, buyer, rider)
- Products and categories
- Orders and order items
- Messages and reviews
- Delivery tracking
- System settings and notifications

### 8. Next Steps
1. Set up the main CraftMart frontend
2. Implement seller registration and product upload
3. Add buyer registration and shopping features
4. Implement rider registration and delivery tracking
5. Add payment integration (GCash)
6. Implement AR product previews
