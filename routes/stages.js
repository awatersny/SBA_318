const express = require("express")
const router = express.Router()
const stages = require("../data/stages")

router
  .route("/")
  .get((req, res) => {
    res.json(stages)
  })

router
  .route("/:id")
  .get((req, res) => {
    res.json(stages[req.params.id - 1])
  })

module.exports = router