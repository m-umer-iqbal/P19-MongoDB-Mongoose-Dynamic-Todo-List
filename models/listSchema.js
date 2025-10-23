import mongoose from "mongoose";
import { toDoListSchema } from "./toDoListSchema.js";

const listSchema = new mongoose.Schema({
    name: String,
    items: [toDoListSchema]
})

export const listCollection = mongoose.model("listCollection", listSchema);