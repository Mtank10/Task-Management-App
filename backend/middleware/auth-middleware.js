import jwt from 'jsonwebtoken';
import User from '../model/user-model.js';

export const auth = async (req, res, next) => {
  try {
   
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied'
      });
    }

   
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token format'
      });
    }

   
    const token = authHeader.substring(7); 

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied'
      });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }

   
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);

    
  }
};
