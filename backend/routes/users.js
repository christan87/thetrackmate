const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res)=>{
    User.find().then(
        users => res.json(users)
    ).catch(
        err => res.status(400).json("Error: " + err)
    )
})

router.route("/add").post((req, res)=>{
    const useremail = req.body.useremail;
    const userAuthId = req.body.userAuthId;
    const newUser = new User({email: useremail, authId: userAuthId});
    newUser.save().then(
        ()=> res.json("User added!")
    ).catch(
        err => res.status(400).json("Error: " + err)
    )
})

//update specific user
router.route("/update/:id").post((req, res)=>{

    User.findById(req.params.id).then(
        (user)=>{
            user.email = req.body.useremail,
            user.authId = req.body.userAuthId
            user.accessToken = req.body.accessToken
            user.save().then(
                ()=> res.json("User updated!")
            ).catch(
                err => res.status(400).json("Error: " + err)
            )
        }
    ).catch(
        err => res.status(400).json("Error: " + err)
    )
})

module.exports = router;