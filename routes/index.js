const express = require("express")
const router = express.Router()

router
  .route("/")
  .get((req, res) => {
    const options = {
      title: "Splatoon 3 Kit Organizer",
      username: "Mobius",
      splashTag: "2102"
    }
  
    res.render("index", options);
  })

module.exports = router