const express = require("express")
const router = express.Router()
const users = require("../data/users")

router
  .route("/")
  .get((req, res) => {
    res.json(users)
  })

router
  .route("/:id")
  .get((req, res) => {
    res.json(users[req.params.id - 1])
  })
  .put((req, res) => {
    const user = users[req.params.id - 1]
    user.userName = req.body.userName
    user.splashTag = req.body.splashTag
    user.species = req.body.species
    user.favWeaponKit = req.body.favWeaponKit
    user.favStage = req.body.favStage
    users[req.params.id - 1] = user
    res.json(users)
  })
  .delete((req, res) => {
    users.splice(req.params.id - 1, 1)
    users.forEach((user, idx) => {
      user.id = idx + 1
    })
    res.json(users)
  })

module.exports = router