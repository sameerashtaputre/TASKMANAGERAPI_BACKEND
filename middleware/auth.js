const jwt=require('jsonwebtoken');
const User=require('../models/User');

const auth = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '').trim();
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
      const user = await User.findOne({ _id: decoded._id });
      if (!user) {
        throw new Error('Unable to login');
      }
  
      req.user = user;
      req.token = token;
      next(); // Move to the next middleware or route handler
    } catch (err) {
      res.status(401).send({ error: err.message });
    }
  };
  
  module.exports = auth; // Correct export
  