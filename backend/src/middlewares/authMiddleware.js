import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// And add this validation at the start of the authenticate middleware:
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Authentication required. Please provide a valid token.' 
      });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ 
        message: 'Invalid or expired token' 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal server error during authentication' 
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Authentication required' 
      });
    }

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ 
        message: 'Access denied. Admin privileges required.' 
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal server error checking admin status' 
    });
  }
};