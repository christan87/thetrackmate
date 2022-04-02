const router = require("express").Router();
const Ticket = require("../models/ticket.model");
// const Comment = require("../models/comment.model");

router.route("/add").post((req, res)=>{
    const ticketName = req.body.name;
    const priority = req.body.priority;
    const type = req.body.type;
    const description = req.body.description;
    const project = req.body.project;
    // const assignedTo = req.body.assignedTo;
    const admin = req.body.admin;
    const newTicket = new Ticket({
        name: ticketName, 
        priority: priority,
        type: type,
        description: description,
        project: project,
        admin: admin,
        // assigned: [assignedTo], 
        admin_privilages: [admin]
    });
    newTicket.save().then(
        ()=> res.json(newTicket._id)
    ).catch(
        err => res.status(400).json("Error: " + err)
    )
})

//find specific ticket
router.route("/:id").get((req, res)=>{
    Ticket.findById(req.params.id).populate("comments").then(
        ticket => res.json(ticket)
    ).catch(
        err => res.status(400).json("Error: " + err)
    )
})

//find users tickets
router.route("/user/:id").get((req, res)=>{
    Ticket.find().where("admin_privilages").equals(req.params.id).exec((err, foundTickets)=>{
        if(err){
            console.log("No Tickets Found: ", err)
        }else{
            res.json({tickets: foundTickets})
        }
    });
})

//update ticket
router.route("/update/:id").put((req, res)=>{
    Ticket.findById(req.params.id).then((ticket)=>{
        ticket.name = req.body.ticketName;
        ticket.priority = req.body.priorityLevel;
        ticket.type = req.body.type;
        ticket.description = req.body.description
        ticket.assigned = req.body.assignedTo;
        ticket.admin_privilages = req.body.admin_privilages;
        ticket.private = req.body.private;
        ticket.save();
        res.json(ticket._id)
    }).catch(
        err => res.status(400).json("Error: " + err)
    )
})

//Delete Ticket and Comments
// router.route("/delete/:id").delete((req, res)=>{
//     Ticket.findByIdAndRemove(req.params.id, (err, ticket)=>{
//         if(err){
//             console.log("routes>tickets.js>Delete: ", err)
//         }else{
//             Comment.deleteMany({_id: {$in: ticket.comments}}, (err2, comment)=>{
//                 if(err){
//                     console.log("routes>tickets.js>Delete: ", err2)
//                 }
//                 else{
//                     res.send("deleted")
//                 }
//             })
//         }
//     });
// });

module.exports = router;