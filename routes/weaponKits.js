const express = require("express")
const router = express.Router()
const weaponKits = require("../data/weaponKits")

router
  .route("/")
  .get((req, res) => {
    res.json(weaponKits)
  })

module.exports = router