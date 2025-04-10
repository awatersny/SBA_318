const express = require("express")
const weaponKits = require("../data/weaponKits")
const stages = require("../data/stages")
const router = express.Router()

router
  .route("/")
  .get((req, res) => {
    const options = {
      title: "Splatoon 3 Kit Organizer",
      kits: weaponKits,
      stages: stages
    }
  
    res.render("index", options);
  })

module.exports = router