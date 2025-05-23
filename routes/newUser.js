const express = require("express")
const weaponKits = require("../data/weaponKits")
const stages = require("../data/stages")
const router = express.Router()

router
  .route("/")
  .get((req, res) => {
    const options = {
      title: "Add Player",
      userName: "",
      splashTag: "",
      species: "Inkling",
      favKit: "Splattershot",
      favStage: "Hagglefish Market",
      buttonText: "Create",
      kits: weaponKits,
      stages: stages,
      isValid: true
    }
  
    res.render("form", options);
  })

module.exports = router