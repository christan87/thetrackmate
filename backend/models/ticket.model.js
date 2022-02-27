const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    assigned: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ], 
    admin_privilages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    collaborator_privilages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    private: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date
    }
})

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;