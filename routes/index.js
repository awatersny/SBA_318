const express = require("express")
const router = express.Router()

router
  .route("/")
  .get((req, res) => {
    res.send("Starting from here.")
  })

module.exports = router