// In your db.js file
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use a fallback value if environment variable is missing
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/taskmaster';
    console.log('Connecting to MongoDB with URI:', uri);
    
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;