const express = require("express")
const weaponKits = require("../data/weaponKits")
const stages = require("../data/stages")
const router = express.Router()

router
  .route("/")
  .get((req, res) => {
    const options = {
      type: "home",
      title: "Splatoon 3 User DB",
      content: "Hello"
    }
  
    res.render("info", options);
  })

module.exports = router