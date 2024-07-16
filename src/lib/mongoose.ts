import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    return console.error("MongoDB is already connected");
  }

  if (isConnected) {
    return;
  }

  try {
    const options: ConnectOptions = {
      dbName: "twitter-clone",
      autoCreate: true,
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    isConnected = true;
  } catch (error) {
    console.error(error);
  }
};

export default connectToDatabase;
