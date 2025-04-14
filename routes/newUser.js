const express = require("express")
const weaponKits = require("../data/weaponKits")
const stages = require("../data/stages")
const router = express.Router()

router
  .route("/")
  .get((req, res) => {
    const options = {
      title: "Add User",
      kits: weaponKits,
      stages: stages
    }
  
    res.render("form", options);
  })

module.exports = router