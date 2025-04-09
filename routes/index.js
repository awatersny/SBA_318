const express = require("express")
const router = express.Router()

router
  .route("/")
  .get((req, res) => {
    const options = {
      title: "Welcome",
      content:
        "I'm just refreshing on ejs here.",
    }
  
    res.render("index", options);
  })

module.exports = router