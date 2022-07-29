const router = require("express").Router();
const Ticket = require("../models/ticket.model");
const Comment = require("../models/comment.model")

router.route("/ticket/:id").post((req, res)=>{
    Ticket.findById(req.params.id).then(
        ticket =>{
            Comment.create(req.body, (err, comment)=>{
                try{
                    comment.text = req.body.text;
                    comment.author.id = req.body.author.id;
                    comment.author.username = req.body.author.name;
                    comment.author.avatar = req.body.author.avatar;
                    //save comment
                    comment.save();
                    ticket.comments.push(comment);
                    ticket.save();
                    res.send("Comment Added!")
                }catch{
                    console.log("Ticket Comment Error: ", err)
                }

            })
        }
    ).catch(
        err => res.status(400).json("Error: " + err)
    )
});

module.exports = router;