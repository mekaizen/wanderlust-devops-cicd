//import mongoose from 'mongoose';
//import { MONGODB_URI } from './utils.js';
//export default function connectDB() {
//  try {
//    mongoose.connect(MONGODB_URI);
//  } catch (err) {
//    console.error(err.message);
//    process.exit(1);
//  }
//
//  const dbConnection = mongoose.connection;
//
//  dbConnection.once('open', () => {
//    console.log(`Database connected: ${MONGODB_URI}`);
//  });
//
//  dbConnection.on('error', (err) => {
//    console.error(`connection error: ${MONGODB_URI}`);
//  });
//  return;
//}


import mongoose from 'mongoose';
import { MONGODB_URI } from './utils.js';

const connectDB = async () => {
  // Check if the SKIP_MONGO environment variable is set to 'true'
  if (process.env.SKIP_MONGO === 'true') {
    console.log('Skipping MongoDB connection due to SKIP_MONGO flag.');
    return; // Skip MongoDB connection if the flag is set
  }

  // Proceed with MongoDB connection if SKIP_MONGO is not set
  if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not set.');
    return; // Skip connection if MONGODB_URI is missing
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }

  const dbConnection = mongoose.connection;

  dbConnection.once('open', () => {
    console.log(`Database connected: ${MONGODB_URI}`);
  });

  dbConnection.on('error', (err) => {
    console.error(`Connection error: ${err.message}`);
  });
};

export default connectDB;
