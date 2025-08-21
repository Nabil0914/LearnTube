import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    youtubePlaylistId: {
        type: String,
        required: true
    },
    totalVideos: {
        type: Number,
        required: true
    },
    completedCount: {
        type: Number,
        default: 0
    }

}, {timestamps: true})

export const Playlist = mongoose.model("Playlist", playlistSchema);