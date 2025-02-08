import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import taxJurisdictionRoutes from './routes/taxJurisdictionRoutes.js';
import taxCategoryRoutes from './routes/taxCategoryRoutes.js';
import shipmentRoutes from './routes/shipmentRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import { connectDB } from './config/db.js';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow non-browser clients (e.g., Postman)
    return callback(null, true); // Allow all browser origins
  },
  credentials: true, // ✅ Allow cookies & authentication headers
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/v1/products', productRoutes);
app.use('/v1/reviews', reviewRoutes);
app.use('/v1/coupons', couponRoutes);
app.use('/v1/tax-jurisdictions', taxJurisdictionRoutes);
app.use('/v1/tax-categories', taxCategoryRoutes);
app.use('/v1/shipment', shipmentRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/cart', cartRoutes);
app.use('/v1/address', addressRoutes);
app.use('/v1/collections', collectionRoutes);
app.use('/v1/categories', categoryRoutes);
app.use('/v1/inventory',inventoryRoutes)
app.use('/v1/users',userRoutes);
app.use('/v1/wishlist',wishlistRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`💫 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();