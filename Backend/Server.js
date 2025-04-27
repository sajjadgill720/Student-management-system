require('dotenv').config();
const mongoose = require('mongoose'); // Ensure mongoose is imported

const connectDB = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGO_URI); // Debugging line to verify MONGO_URI
    await mongoose.connect(process.env.MONGO_URI); // Removed deprecated options
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;