const router = require("express").Router();
let Project = require("../models/project.model");


router.route("/add").post((req, res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const priority = req.body.priority;
    const status = req.body.status;
    const private = req.body.private;
    const admin = req.body.admin;
    const newProject = new Project({
        name: name, 
        description: description,
        priority: priority,
        status: status,
        private: private,
        admin: admin
    });
    newProject.save().then(
        ()=> res.json("Project added!")
    ).catch(
        err => res.status(400).json("Error: " + err)
    )
})

module.exports = router;