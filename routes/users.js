const express = require("express")
const router = express.Router()
const users = require("../data/users")
const weaponKits = require("../data/weaponKits")
const stages = require("../data/stages")
const error = require("../utilities/error")

router
  .route("/")
  .get((req, res, next) => {
    const kitId = req.query["kitId"]
    const options = {
      content: "There are currently no players listed",
      type: "users",
      title: "Player Info",
      users: users,
      showKitDetails: false
    }
    if(kitId) {
      if(kitId < 1 || kitId > weaponKits.length){
        next(error(404, "Oops!  There's nothing here."))
      }
      const favWeaponKit = weaponKits.find(kit => kit.id == kitId)
      options.content = `There are no players with ${favWeaponKit.kitName} as their favorite weapon kit.`
      options.users = users
      .filter(user => user.favWeaponKit == favWeaponKit.kitName)
    }
    res.render("info", options)
  })
  .post((req, res) => {
    if(/^[0-9]{4,5}$/.test(req.body.splashTag) && req.body.userName.length < 11){
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
    } else {
      const options = {
        title: "Invalid",
        userName: "",
        splashTag: "",
        species: "Inkling",
        favKit: "Splattershot",
        favStage: "Hagglefish Market",
        buttonText: "Create",
        kits: weaponKits,
        stages: stages
      }
      res.render("form", options);
    }
  })

router
  .route("/:id")
  .get((req, res, next) => {
    const userId = parseInt(req.params.id)
    if(userId < 1 || userId > users.length || Number.isNaN(userId)) {
      next(error(404, "Oops!  There's nothing here."))
    }
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
  .put((req, res) => {
    const user = users[req.params.id - 1]
    user.userName = req.body.userName
    user.splashTag = req.body.splashTag
    user.species = req.body.species
    user.favWeaponKit = req.body.favWeaponKit
    user.favStage = req.body.favStage
    users[req.params.id - 1] = user
    res.redirect(`/users/${req.params.id}`)
  })
  .delete((req, res) => {
    users.splice(req.params.id - 1, 1)
    users.forEach((user, idx) => {
      user.id = idx + 1
    })
    res.redirect("/users")
  })

router
  .route("/:id/edit")
  .get((req, res) => {
    const user = users[req.params.id - 1]
    const options = {
      userId: req.params.id,
      title: `Edit ${user.userName}`,
      userName: user.userName,
      splashTag: user.splashTag,
      species: user.species,
      favKit: user.favWeaponKit,
      favStage: user.favStage,
      buttonText: "Update",
      kits: weaponKits,
      stages: stages
    }
  
    res.render("form", options);
  })

router
  .route("/api")
  .get((req, res) => {
    res.json(users)
  })

module.exports = router