# Hampi Yura - Complete E-commerce Ecosystem with Dashboard & API

![Homepage Preview](/dashboard/public/images/localhost_3000_.png)
_Preview of the Hampi Yura homepage_

## 🌿 About

Hampi Yura is a comprehensive e-commerce ecosystem focused on providing natural and organic medicinal plants and body care products. This full-stack application consists of three main components: a customer-facing e-commerce website, an administrative dashboard, and a robust REST API, all designed to serve as a digital marketplace for those seeking authentic and natural treatments inspired by ancient traditions and natural wisdom.

## 🏗️ Architecture Overview

This project is built with a modern three-tier architecture:

### 🌐 **E-commerce Website** (`/Express/`)
The main customer-facing application built with Node.js and Express, featuring a traditional server-side rendered interface.

### 📊 **Admin Dashboard** (`/dashboard/`)
A React-based single-page application providing comprehensive administrative tools for managing users, products, and business analytics.

### 🔗 **REST API** (`/Express/api/`)
A robust API layer that serves both the dashboard and can be used for future mobile applications or third-party integrations.

---

## 🌐 E-commerce Website

### Features
- **Product Catalog**: Comprehensive showcase of medicinal plants and body care products
- **User Authentication**: Secure registration and login system with session management
- **Shopping Cart**: Full cart functionality with add/remove/update capabilities
- **User Profiles**: Personal account management with avatar uploads
- **Responsive Design**: Mobile-friendly interface with natural earth-tone styling
- **Product Categories**: Organized sections for Fitoterapia (Phytotherapy) and other natural products
- **Search & Filter**: Easy product discovery and navigation

### Key Pages
- **Homepage** (`/`): Featured products and company philosophy
- **Product Catalog** (`/productos`): Complete product listing with categories
- **Shopping Cart** (`/carrito`): Cart management and checkout process
- **User Account** (`/user/profile`): Personal information and order history
- **Authentication** (`/user/login`, `/user/register`): Secure user access

### Technologies
- **Backend**: Node.js, Express.js
- **Template Engine**: EJS for server-side rendering
- **Database**: PostgreSQL with Sequelize ORM
- **Session Management**: express-session with secure cookies
- **File Uploads**: Multer for avatar and product images
- **Styling**: Custom CSS with natural design system

---

## 📊 Admin Dashboard

### Features
- **User Management**: Complete CRUD operations for user accounts
- **Product Management**: Add, edit, delete, and organize products
- **Analytics Overview**: Business metrics and key performance indicators
- **Data Visualization**: Interactive charts and graphs using Chart.js
- **Responsive Tables**: Scrollable tables with search and pagination
- **Real-time Updates**: Live data synchronization with the API
- **Advanced Forms**: Professional form interfaces with validation

### Dashboard Sections
- **Overview**: Business metrics, recent activity, and key statistics
- **Users Management**: User list, registration, editing, and role management
- **Products Management**: Product catalog administration with image uploads
- **Analytics**: Sales reports, user engagement, and growth metrics
- **Settings**: System configuration and administrative tools

### Key Components
- **UsersInDb**: Enhanced user management with professional card-based forms
- **ProductsInDb**: Product administration with inventory tracking
- **LastProductInDb**: Recent product preview cards
- **ContentWrapper**: Responsive layout with optimized scrolling

### Technologies
- **Frontend**: React.js with functional components and hooks
- **Styling**: Custom CSS with Bootstrap-inspired utilities
- **HTTP Client**: Fetch API for REST communication
- **State Management**: React useState and useEffect hooks
- **Form Handling**: Controlled components with validation
- **Responsive Design**: Mobile-first approach with flexbox layouts

---

## 🔗 REST API

### API Endpoints

#### User Management (`/api/users/`)
- `GET /api/users` - Retrieve all users
- `POST /api/users` - Create new user account
- `GET /api/users/:id` - Get specific user details
- `PUT /api/users/:id` - Update user information
- `DELETE /api/users/:id` - Remove user account

#### Product Management (`/api/products/`)
- `GET /api/products` - Retrieve all products
- `POST /api/products` - Add new product
- `GET /api/products/:id` - Get specific product details
- `PUT /api/products/:id` - Update product information
- `DELETE /api/products/:id` - Remove product

#### Authentication (`/api/auth/`)
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - Session termination
- `GET /api/auth/verify` - Token validation

### API Features
- **RESTful Design**: Standard HTTP methods and status codes
- **JSON Responses**: Consistent data format across all endpoints
- **Error Handling**: Comprehensive error responses with meaningful messages
- **Validation**: Input validation and sanitization
- **CORS Support**: Cross-origin requests for dashboard integration
- **File Upload**: Support for product images and user avatars
- **Pagination**: Efficient data retrieval for large datasets

### Response Format
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50
  }
}
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/juansv2k2/hampi-yura-ecommerce-w-dashboard-api.git
cd hampi-yura-ecommerce-w-dashboard-api
```

### 2. Database Setup
```bash
# Create PostgreSQL database
createdb hampi_yura_db

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Backend Setup (E-commerce Website + API)
```bash
# Navigate to Express directory
cd Express

# Install dependencies
npm install

# Run database migrations
npm run migrate

# Seed initial data
npm run seed

# Start the server
npm start
# Server runs on http://localhost:3000
# API available at http://localhost:3001
```

### 4. Dashboard Setup
```bash
# Navigate to dashboard directory
cd dashboard

# Install dependencies
npm install

# Start the development server
npm start
# Dashboard runs on http://localhost:3002
```

### 5. Environment Variables
Create a `.env` file in the root directory:
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/hampi_yura_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hampi_yura_db
DB_USER=your_username
DB_PASS=your_password

# Session Configuration
SESSION_SECRET=your_super_secret_key

# API Configuration
API_PORT=3001
APP_PORT=3000

# File Upload Configuration
UPLOAD_PATH=./public/images/
MAX_FILE_SIZE=5242880
```

---

## 🎨 Design System

### Color Palette
- **Primary Green**: `#3d5f2b` - Natural forest tones
- **Secondary Aqua**: `#84c3c3` - Calming water elements
- **Accent Orange**: `#dd9859` - Warm earth highlights
- **Natural Beige**: `#f1e4d8` - Soft background tones
- **Earth Brown**: `#422613` - Deep natural contrast

### Typography
- **Primary Font**: Nunito - Clean, modern readability
- **Headings**: Bold weights with natural color scheme
- **Body Text**: Comfortable line-height for easy reading

### Components
- **Buttons**: Gradient backgrounds with hover animations
- **Cards**: Subtle shadows with border accents
- **Tables**: Responsive with custom scrollbars
- **Forms**: Professional styling with validation feedback

---

## 📱 Usage Guide

### For Customers (E-commerce Website)
1. **Browse Products**: Visit the homepage and explore categories
2. **Create Account**: Register for personalized experience
3. **Add to Cart**: Select products and manage your shopping cart
4. **Checkout**: Complete purchases with secure payment processing
5. **Manage Profile**: Update personal information and view order history

### For Administrators (Dashboard)
1. **Access Dashboard**: Login with admin credentials
2. **Monitor Overview**: View business metrics and recent activity
3. **Manage Users**: Add, edit, or remove user accounts
4. **Handle Products**: Update inventory, add new products, manage categories
5. **View Analytics**: Track sales performance and user engagement

### For Developers (API)
1. **Authentication**: Obtain API credentials or tokens
2. **Make Requests**: Use standard HTTP methods with JSON payloads
3. **Handle Responses**: Process JSON responses with error handling
4. **File Uploads**: Use multipart/form-data for image uploads
5. **Pagination**: Implement proper pagination for large datasets

---

## 🛠️ Technologies Used

### Backend Stack
- **Runtime**: Node.js (Express.js framework)
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: express-session, bcrypt for password hashing
- **File Handling**: Multer for image uploads
- **Validation**: express-validator for input sanitization
- **CORS**: Cross-origin resource sharing support

### Frontend Stack
- **Website**: EJS templating with custom CSS
- **Dashboard**: React.js with modern hooks pattern
- **Styling**: Custom CSS with responsive design principles
- **Icons**: Font Awesome for consistent iconography
- **Charts**: Chart.js for data visualization

### Development Tools
- **Version Control**: Git with GitHub integration
- **Package Management**: npm with package-lock.json
- **Environment**: dotenv for configuration management
- **Debugging**: Morgan for request logging

---

## 🔒 Security Features

- **Password Security**: bcrypt hashing with salt rounds
- **Session Management**: Secure cookie configuration
- **Input Validation**: Server-side validation and sanitization
- **File Upload Security**: Type validation and size limits
- **CORS Configuration**: Controlled cross-origin access
- **SQL Injection Prevention**: Sequelize ORM with parameterized queries

---

## 📈 Performance Optimizations

- **Database Indexing**: Optimized queries with proper indexes
- **Image Optimization**: Compressed uploads with size limits
- **Caching**: Session-based caching for improved response times
- **Responsive Design**: Mobile-first approach for all devices
- **Lazy Loading**: Efficient data loading strategies
- **Minified Assets**: Compressed CSS and JavaScript files

---

## 🤝 Contributing

We welcome contributions to improve Hampi Yura! Please follow these steps:

1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Commit Changes**: `git commit -m 'Add amazing feature'`
4. **Push to Branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**: Describe your changes and improvements

### Development Guidelines
- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility
- Test across different browsers and devices

---

## 📄 License

This project is created for educational purposes and portfolio demonstration. Feel free to use it as a reference for learning full-stack development with Node.js, React, and PostgreSQL.

---

## 🙏 Acknowledgments

- Natural design inspiration from traditional medicinal practices
- Bootstrap and modern CSS techniques for responsive design
- React community for component patterns and best practices
- Express.js documentation for API development guidelines
