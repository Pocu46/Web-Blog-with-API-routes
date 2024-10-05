import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async (): Promise<void> => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('MongoDB is already connected')
    return;
  }

  try {
    if (process.env.MONGODB_URI) {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "Notes-db",
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as mongoose.ConnectOptions) // Explicitly cast to ConnectOptions
    } else {
      throw new Error("MONGODB_URI is not defined in environment variables")
    }

    isConnected = true;
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}
