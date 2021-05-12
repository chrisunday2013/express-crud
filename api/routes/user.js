const express = require("express")
const router = express.Router()
const User = require("../model/userModel")
mongoose = require("mongoose")


router.get("/", (req, res, next) => {
  User.find()
  .exec()
  .then(userList => res.status(200).json(userList))
  .catch(err => res.status(500).json({ error : err }))
})


router.post("/", (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    country: req.body.country

  })
  user.save()
  .then(result => console.log(result))
  .catch(err => console.log(err))
  res.status(200).json({
    "message": "New User has been created successfully"
  })
})


router.delete("/:userId", (req, res, next) => {
  const id = req.params.userId
  User.remove({_id: id})
  .exec()
  .then(result => {
   res.status(200).json(result)
  })
  
  .catch(err => {
    res.status(500).json({ error: err})
  })
})


router.get("/:userId", (req, res, next) => {
  const id = req.params.userId
  User.findById(id)
  .exec()
  .then(user =>{
    if(user) {
      res.status(200).json(user)

    }else {
      res.status(404).json({ "message": "user not found"})
    }
  })
  .catch(err =>{
    res.status(500).json({ error: err})
  })
})

module.exports = router