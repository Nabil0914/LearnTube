import mongoose from "mongoose";

const videosSchema = new mongoose.Schema({
    playlistId: {
        type: mongoose.Types.ObjectId,
        ref: 'Playlist'
    },
    title: {
        type: String,
        required: true
    },
    youtubeVideoId: {
        type: String,
        required: true
    },
    position : { // order in playlist
        type: Number,
        required: true
    },
    isWatched: {
        type: Boolean,
        default: false
    },
    isImportant: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export const Videos = mongoose.model("Videos", videosSchema);