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


const connectDB = async () => {
    if (process.env.SKIP_MONGO === 'true') {
        console.log('Skipping MongoDB connection due to SKIP_MONGO flag.');
        return; // Skip MongoDB connection if the flag is set
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};
