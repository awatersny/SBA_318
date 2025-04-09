const express = require("express")
const router = express.Router()
const stages = require("../data/stages")

router
  .route("/")
  .get((req, res) => {
    res.json(stages)
  })

module.exports = router