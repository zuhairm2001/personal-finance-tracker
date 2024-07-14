const mongoose = require('mongoose');
require('dotenv').config({ path:'.env' });



const connectDB = async () => {
    try {
      await mongoose.connect(process.env.ATLAS_URI);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;
  
  