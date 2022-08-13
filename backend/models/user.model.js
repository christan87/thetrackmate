const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    authId: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        default: ""
    },
    photoURL:{
        type: String,
        default: ""
    },
    private:{
        type: Boolean,
        default: true
    },
    discoverable:{
        type: Boolean,
        default: true
    },
    projects:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ],
    tickets:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket"
        }
    ],
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
});

const User = mongoose.model("User", userSchema);
module.exports = User;