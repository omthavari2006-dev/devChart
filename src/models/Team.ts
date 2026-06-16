import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    teamNumber: {
        type: Number,
        required: true,
    },
    members: [
        {
            type: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);

export default Team;
