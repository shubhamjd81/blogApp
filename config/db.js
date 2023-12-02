import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("connected to DB");
  } catch (error) {
    console.log("DB Connect Error");
  }
};
