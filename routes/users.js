const express = require("express")
const router = express.Router()
const users = require("../data/users")

router
  .route("/")
  .get((req, res) => {
    const options = {
      title: "Splatoon 3 Kit Organizer",
      users: users
    }

    res.render("users", options)
  })

  router
  .route("/api")
  .get((req, res) => {
    res.json(users)
  })  

module.exports = router