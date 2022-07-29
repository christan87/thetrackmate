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
        ()=> res.json(newProject)
    ).catch(
        err => res.status(400).json("Error: " + err)
    )
})

//find users projects
router.route("/user/:id").get((req, res)=>{
    Project.find().where("admin").equals(req.params.id).populate("tickets").exec((err, foundProjects)=>{
        if(err){
            console.log("No Projecta Found: ", err)
        }else{
            res.json({projects: foundProjects})
        }
    });
})

//find specific project
router.route("/:id").get((req, res)=>{
    Project.findById(req.params.id).then((project)=>{
        return res.json(project)
    }).catch((err)=>{
        res.status(400).json("Error: " + err)
    })
});

//update project
router.route("/update/:id").put((req, res)=>{
    Project.findById(req.params.id).then((project)=>{
        project.name = req.body.name;
        project.assigned = req.body.assignedTo;
        project.status = req.body.status;
        project.priority = req.body.priority;
        project.description = req.body.description;
        project.private = req.body.private;
        project.tickets = req.body.tickets;
        project.save();
        res.json(project._id)
    }).catch(
        err => res.status(400).json("Error: " + err)
    )
})
module.exports = router;