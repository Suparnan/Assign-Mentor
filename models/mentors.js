import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    students: {
        type: [String],
        required: true,
    },
});

export const Mentor = mongoose.model("Mentor", mentorSchema);
