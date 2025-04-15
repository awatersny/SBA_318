const express = require("express")
const router = express.Router()
const users = require("../data/users")
const weaponKits = require("../data/weaponKits")
const stages = require("../data/stages")

router
  .route("/users")
  .get((req, res) => {
    res.json(users)
  })

router
  .route("/users/:id")
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

router
  .route("/stages")
  .get((req, res) => {
    res.json(stages)
  })

router
  .route("/stages/:id")
  .get((req, res) => {
    res.json(stages[req.params.id - 1])
  })

router
  .route("/kits")
  .get((req, res) => {
    res.json(weaponKits)
  })

router
  .route("/kits/:id")
  .get((req, res) => {
    res.json(weaponKits[req.params.id - 1])
    })

module.exports = router