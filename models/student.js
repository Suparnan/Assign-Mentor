import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
    mentor: {
        type: String,
        required: true,
    },
});

export const Student = mongoose.model("Student", studentSchema);