import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    short_description: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Upcoming", "Ongoing"]
    },
    coverImage: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    clubID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    registeredUsers: {
        user_id: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User"
        },
        notified: {
            type: Boolean,
            default: false
        }
    }
}, {timestamp: true});

const Event = mongoose.model("Event", eventSchema);
export default Event;