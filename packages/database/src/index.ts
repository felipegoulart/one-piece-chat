import mongoose, { type ConnectOptions, type Mongoose } from "mongoose";

export const connection = async (uri: string, config?: ConnectOptions): Promise<Mongoose> => {
  return await mongoose.connect(uri, config);
};
