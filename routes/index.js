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
      content: "This is an application where you can store Splatoon 3 player info.The api is available",
      link: "/api",
      linkText: "here."
    }
  
    res.render("info", options);
  })

module.exports = router