const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection extablished successfully")
})

//routes begin

const usersRouter = require("./routes/users");
const projectsRouter = require("./routes/projects");
const ticketsRouter = require("./routes/tickets")
const commentsRouter = require("./routes/comments")

app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/tickets", ticketsRouter);
app.use("/comments", commentsRouter);


//routes end

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})