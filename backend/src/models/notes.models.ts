import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    videoId: {
        type: mongoose.Types.ObjectId,
        ref: 'Videos'
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Notes = mongoose.model("Notes", notesSchema);