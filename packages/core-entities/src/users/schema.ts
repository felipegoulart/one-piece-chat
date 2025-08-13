import { type ObjectId, Schema } from "mongoose";
import type { User } from "./entity";

type MongooseUserSchema = Omit<User, "id"> & { _id: ObjectId } & Document;

export const userMongoSchema = new Schema<MongooseUserSchema>(
  {
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    deletedAt: { type: Date, required: false },
  },
  { timestamps: true },
);
