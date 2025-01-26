# Folder Structure and Files

## prisma
schema.prisma: Defines database schema.
migrations/: Auto-generated migration files.
seed.js: Script for seeding initial data (e.g., categories, admin user).
src

## controllers/

- `authController.js`: Handles user authentication (login, signup, logout).
- `userController.js`: Manages user profile, preferences, and addresses.
- `productController.js`: Fetches products, collections, and categories.
- `cartController.js`: Manages cart operations.
- `orderController.js`: Handles orders, payment, and tracking.
- `wishlistController.js`: Handles user wishlists.
- `reviewController.js`: Manages product reviews.
- `couponController.js`: Applies and validates coupons.
- `inventoryController.js`: Handles inventory checks.
- `saleController.js`: Manages sales and discounts.

## middlewares/

- `authMiddleware.js`: Verifies user authentication and role.
- `adminMiddleware.js : Admin role validation

## routes/

- `authRoutes.js`: Routes for login, signup, logout.
- `userRoutes.js`: Routes for user profile, addresses, and preferences.
- `productRoutes.js`: Routes for products, categories, and collections.
- `cartRoutes.js`: Routes for managing the cart.
- `orderRoutes.js`: Routes for creating and viewing orders.
- `wishlistRoutes.js`: Routes for wishlist operations.
- `reviewRoutes.js`: Routes for adding and viewing reviews.
- `couponRoutes.js`: Routes for applying and validating coupons.
- `saleRoutes.j`s: Routes for fetching sales and discounts.

## utils/
Functions that are used regularly by different parts.

- `jwtHelper.js`: Generates and verifies JWTs.
- `passwordHelper.js`: Hashes and validates passwords.
- `paginationHelper.js`: Paginates large datasets (e.g., products).
- `filterHelper.js`: Handles product filtering and sorting.
- `randomIdGenerator.js`: Generates unique IDs (for orders, SKUs, etc.).
- `errorHandler.js`: Formats error responses.

## config/

- `database.js`: Prisma client instance setup.
- `dotenv.config.js`: Loads environment variables.

## services/
All function related to database .
Services encapsulate logic to interact with the database via Prisma.

- `userService.js`: Manages user data operations (CRUD).
- `productService.js`: Fetches products, categories, collections.
- `orderService.js`: Handles orders and payments.
- `wishlistService.js`: Manages wishlist interactions.
- `cartService.js`: Updates and validates cart items.

# Entry Files

- `index.js`
Starts the server by calling app.listen().

---

# API ENDPOINTS

### **Authentication & User Management**
- `POST /auth/register` - Register a new user.
- `POST /auth/login` - Login user.
- `POST /auth/logout` - Logout user.
- `POST /auth/forgot-password` - Send password reset link.
- `POST /auth/reset-password` - Reset user password.
- `GET /users/me` - Fetch authenticated user details.
- `PUT /users/me` - Update user profile.
- `GET /users/:id` (Admin) - Fetch a user by ID.
- `GET /users` (Admin) - List all users with filters.

---

### **Address Management**
- `POST /addresses` - Add a new address.
- `GET /addresses` - Get all addresses for the logged-in user.
- `GET /addresses/:id` - Get a specific address.
- `PUT /addresses/:id` - Update an address.
- `DELETE /addresses/:id` - Delete an address.

---

### **Product Management**
- `GET /products` - Get all products (with filters like category, price range, etc.).
- `GET /products/:id` - Get product details.
- `GET /products/:id/variants` - Get variants for a product.
- `POST /products` (Admin) - Add a new product.
- `PUT /products/:id` (Admin) - Update product details.
- `DELETE /products/:id` (Admin) - Delete a product.

---

### **Category & Collection Management**
- `GET /categories` - List all categories.
- `GET /categories/:id` - Get category details.
- `POST /categories` (Admin) - Add a new category.
- `PUT /categories/:id` (Admin) - Update a category.
- `DELETE /categories/:id` (Admin) - Delete a category.
- `GET /collections` - List all collections.
- `POST /collections` (Admin) - Add a new collection.
- `PUT /collections/:id` (Admin) - Update a collection.
- `DELETE /collections/:id` (Admin) - Delete a collection.

---

### **Wishlist Management**
- `POST /wishlists` - Add a product to the wishlist.
- `GET /wishlists` - Get all wishlist items for a user.
- `DELETE /wishlists/:id` - Remove a product from the wishlist.

---

### **Cart Management**
- `POST /carts` - Add a product variant to the cart.
- `GET /carts` - View the cart.
- `PUT /carts/:id` - Update quantity of a cart item.
- `DELETE /carts/:id` - Remove a product variant from the cart.

---

### **Order Management**
- `POST /orders` - Place a new order.
- `GET /orders` - Get orders for the logged-in user.
- `GET /orders/:id` - Get details of a specific order.
- `PUT /orders/:id/cancel` - Cancel an order.
- `GET /orders/admin` (Admin) - Get all orders.
- `PUT /orders/:id` (Admin) - Update order status.

---

### **Product Reviews**
- `POST /reviews` - Add a product review.
- `GET /reviews` - Get all reviews for a product.
- `DELETE /reviews/:id` - Delete a review.

---

### **Coupons**
- `GET /coupons` - Get available coupons.
- `POST /coupons` (Admin) - Create a new coupon.
- `PUT /coupons/:id` (Admin) - Update a coupon.
- `DELETE /coupons/:id` (Admin) - Delete a coupon.

---

### **Dashboard (Admin)**
- `GET /dashboard/sales` - Fetch sales data (with filters like date, product, etc.).
- `GET /dashboard/inventory` - Fetch inventory status.
- `GET /dashboard/users` - Get user registration trends.

---

### **Inventory Management (Admin)**
- `GET /inventory` - View inventory levels.
- `PUT /inventory/:id` - Update stock levels.

---

### **Tax & Shipment Management**
- `GET /tax-jurisdictions` (Admin) - List all tax jurisdictions.
- `POST /tax-jurisdictions` (Admin) - Add a new tax jurisdiction.
- `GET /shipments` (Admin) - View all shipments.
- `PUT /shipments/:id` (Admin) - Update shipment status.

---

### **Sales Management**
- `GET /sales` - Fetch active sales.
- `POST /sales` (Admin) - Create a sale.
- `PUT /sales/:id` (Admin) - Update sale details.
- `DELETE /sales/:id` (Admin) - Delete a sale.

---
Based on your Prisma schema and the described functionality for your jewelry e-commerce site, here’s a comprehensive list of API endpoints. These are grouped based on the functionality for **customers** and **admin users**.

---

### **Authentication & User Management**
- `POST /auth/register` - Register a new user.
- `POST /auth/login` - Login user.
- `POST /auth/logout` - Logout user.
- `POST /auth/forgot-password` - Send password reset link.
- `POST /auth/reset-password` - Reset user password.
- `GET /users/me` - Fetch authenticated user details.
- `PUT /users/me` - Update user profile.
- `GET /users/:id` (Admin) - Fetch a user by ID.
- `GET /users` (Admin) - List all users with filters.

---

### **Address Management**
- `POST /addresses` - Add a new address.
- `GET /addresses` - Get all addresses for the logged-in user.
- `GET /addresses/:id` - Get a specific address.
- `PUT /addresses/:id` - Update an address.
- `DELETE /addresses/:id` - Delete an address.

---

### **Product Management**
- `GET /products` - Get all products (with filters like category, price range, etc.).
- `GET /products/:id` - Get product details.
- `GET /products/:id/variants` - Get variants for a product.
- `POST /products` (Admin) - Add a new product.
- `PUT /products/:id` (Admin) - Update product details.
- `DELETE /products/:id` (Admin) - Delete a product.

---

### **Category & Collection Management**
- `GET /categories` - List all categories.
- `GET /categories/:id` - Get category details.
- `POST /categories` (Admin) - Add a new category.
- `PUT /categories/:id` (Admin) - Update a category.
- `DELETE /categories/:id` (Admin) - Delete a category.
- `GET /collections` - List all collections.
- `POST /collections` (Admin) - Add a new collection.
- `PUT /collections/:id` (Admin) - Update a collection.
- `DELETE /collections/:id` (Admin) - Delete a collection.

---

### **Wishlist Management**
- `POST /wishlists` - Add a product to the wishlist.
- `GET /wishlists` - Get all wishlist items for a user.
- `DELETE /wishlists/:id` - Remove a product from the wishlist.

---

### **Cart Management**
- `POST /carts` - Add a product variant to the cart.
- `GET /carts` - View the cart.
- `PUT /carts/:id` - Update quantity of a cart item.
- `DELETE /carts/:id` - Remove a product variant from the cart.

---

### **Order Management**
- `POST /orders` - Place a new order.
- `GET /orders` - Get orders for the logged-in user.
- `GET /orders/:id` - Get details of a specific order.
- `PUT /orders/:id/cancel` - Cancel an order.
- `GET /orders/admin` (Admin) - Get all orders.
- `PUT /orders/:id` (Admin) - Update order status.

---

### **Product Reviews**
- `POST /reviews` - Add a product review.
- `GET /reviews` - Get all reviews for a product.
- `DELETE /reviews/:id` - Delete a review.

---

### **Coupons**
- `GET /coupons` - Get available coupons.
- `POST /coupons` (Admin) - Create a new coupon.
- `PUT /coupons/:id` (Admin) - Update a coupon.
- `DELETE /coupons/:id` (Admin) - Delete a coupon.

---

### **Dashboard (Admin)**
- `GET /dashboard/sales` - Fetch sales data (with filters like date, product, etc.).
- `GET /dashboard/inventory` - Fetch inventory status.
- `GET /dashboard/users` - Get user registration trends.

---

### **Inventory Management (Admin)**
- `GET /inventory` - View inventory levels.
- `PUT /inventory/:id` - Update stock levels.

---

### **Tax & Shipment Management**
- `GET /tax-jurisdictions` (Admin) - List all tax jurisdictions.
- `POST /tax-jurisdictions` (Admin) - Add a new tax jurisdiction.
- `GET /shipments` (Admin) - View all shipments.
- `PUT /shipments/:id` (Admin) - Update shipment status.

---

### **Sales Management**
- `GET /sales` - Fetch active sales.
- `POST /sales` (Admin) - Create a sale.
- `PUT /sales/:id` (Admin) - Update sale details.
- `DELETE /sales/:id` (Admin) - Delete a sale.

# implement remaining endpoints... 

