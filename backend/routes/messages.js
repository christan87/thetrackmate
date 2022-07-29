const router = require("express").Router();
let Message = require("../models/message.model")
let User = require("../models/user.model");

router.route("/message/:id").post((req, res)=>{
    User.findById(req.params.id).then(
        user =>{
            Message.create(req.body, (err, message)=>{
                try{
                    message.type = req.body.type;
                    message.subject = req.body.subject;
                    message.text = req.body.text;
                    message.author = req.body.author;
                    message.recipient = req.body.recipient;
                    //save message
                    message.save((err)=>{
                        if(err){
                            console.log("message.save()>", err)
                        }
                    });
                    user.messages.push(message._id);
                    user.save();
                    res.send("Message Sent!")
                }catch(err){
                    console.log("User Message Error: ", err)
                }

            })
        }
    ).catch(
        err => res.status(400).json("Error: " + err)
    )
});

router.route("/reply/:id").post((req, res)=>{
    User.findById(req.params.id).then(
        user =>{
            Message.create(req.body, (err, message)=>{
                try{
                    message.type = req.body.type;
                    message.subject = req.body.subject;
                    message.text = req.body.text;
                    message.author = req.body.author;
                    message.recipient = req.body.recipient;
                    //save message
                    message.save((err)=>{
                        if(err){
                            console.log("message.save()>", err)
                        }
                    });
                    user.messages.push(message._id);
                    user.save();
                    res.send("Reply Sent!")
                }catch(err){
                    console.log("User Reply Error: ", err)
                }

            })
        }
    ).catch(
        err => res.status(400).json("Error: " + err)
    )
});

module.exports = router;