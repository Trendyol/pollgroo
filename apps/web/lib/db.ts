import mongoose, { Mongoose } from 'mongoose';

const { MONGODB_URI } = process.env;

let cached: { conn: Mongoose | null; promise: Promise<Mongoose> | null } = {
  conn: null,
  promise: null,
};

async function connectToDatabase(): Promise<Mongoose> {
  if (!MONGODB_URI) {
    throw new Error("ERROR: MONGODB_URI environment variable doesn't exist !");
  }
  
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.info('Connected to MongoDB');
      return mongoose;
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default connectToDatabase;
