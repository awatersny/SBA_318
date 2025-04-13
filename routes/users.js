const express = require("express")
const router = express.Router()
const users = require("../data/users")
const weaponKits = require("../data/weaponKits")

router
  .route("/")
  .get((req, res) => {
    const options = {
      type: "users",
      title: "Player Info",
      users: users,
      showKitDetails: false
    }
    res.render("info", options)
  })
  .post((req, res) => {
    const newUser = {
      id: users.length + 1,
      splashTag: req.body.splashTag,
      userName: req.body.userName,
      species: req.body.species,
      favWeaponKit: req.body.favWeaponKit,
      favStage: req.body.favStage,
      img: ""
    }
    users.push(newUser)
    res.redirect("/users")
  })

  router
  .route("/:id")
  .get((req, res) => {
    const user = users[req.params.id - 1]
    const options = {
      type: "users",
      title: user.userName,
      users: [user],
      kit: weaponKits.find((kit) => kit.kitName == user.favWeaponKit),
      showKitDetails: true
    }
    res.render("info", options)
  })
  .put((req, res) => {})
  .delete((req, res) => {
    console.log("delete")
  })

  router
  .route("/api")
  .get((req, res) => {
    res.json(users)
  })

module.exports = router