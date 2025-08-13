import { type Document, type ObjectId, Schema } from "mongoose";
import type { Room } from "./entity.js";

type MongooseRoomSchema = Omit<Room, "id"> & { _id: ObjectId } & Document;

export const roomMongoSchema = new Schema<MongooseRoomSchema>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    code: { type: String, required: true, unique: true },
    deletedAt: { type: Date, required: false },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);
