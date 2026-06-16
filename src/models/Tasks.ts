import mongoose from "mongoose";




const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: false,
    },
    deadline: {
        type: Date,
        required: false,
    },
    todos: [
    {
        text: String,
        completed: {
        type: Boolean,
        default: false
        }
    }
    ],
    completed: {
        type: Boolean,
        default: false,
    },
    status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
},
    createdAt: {
        type: Date,
        default: Date.now,
    },
    teamName: {
    type: String,
    default: null,
    },
});

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default Task;