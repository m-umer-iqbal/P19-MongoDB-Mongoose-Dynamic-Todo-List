import mongoose from "mongoose";

export const toDoListSchema = new mongoose.Schema({
    toDoTask: String
})

export const toDoListCollection = mongoose.model("toDoListCollection", toDoListSchema);