const express = require("express")
const router = express.Router()
const weaponKits = require("../data/weaponKits")

router
  .route("/")
  .get((req, res) => {
    res.json(weaponKits)
  })

router
  .route("/:id")
  .get((req, res) => {
    res.json(weaponKits[req.params.id - 1])
    })

module.exports = router