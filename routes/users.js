const express = require("express")
const router = express.Router()
const users = require("../data/users")

router
  .route("/")
  .get((req, res) => {
    const options = {
      title: "Splatoon 3 Kit Organizer",
      users: users
    }

    res.render("users", options)
  })
  .post((req, res) => {
    const newUser = {
      id: users.length,
      splashTag: req.body.splashTag,
      userName: req.body.userName,
      species: req.body.species,
      favWeaponKit: req.body.favWeaponKit,
      favStage: req.body.favStage,
      img: ""
    }
    users.push(newUser)
  })

  router
  .route("/api")
  .get((req, res) => {
    res.json(users)
  })

module.exports = router