const express = require("express")
const router = express.Router()
const weaponKits = require("../data/weaponKits")

router
  .route("/kits")
  .get((req, res) => {
    res.json(weaponKits)
  })

router
  .route("/kits/:id")
  .get((req, res) => {
    res.json(weaponKits[req.params.id - 1])
    })

module.exports = router