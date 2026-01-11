import mongoose from "mongoose";

// Function to connect to MongoDB
export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("database connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URL}/chat-app`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
