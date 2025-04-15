const express = require("express")
const router = express.Router()
const users = require("../data/users")
const weaponKits = require("../data/weaponKits")
const stages = require("../data/stages")

router
  .route("/")
  .get((req, res) => {
    res.json({
      links: [
        {
          href: "/users",
          rel: "users",
          type: "GET"
        },
        {
          href: "/users",
          rel: "users",
          type: "POST"
        },
        {
          href: "/kits",
          rel: "kits",
          type: "GET"
        },
        {
          href: "/stages",
          rel: "stages",
          type: "GET"
        },
      ],
    })
  })

router
  .route("/users")
  .get((req, res) => {
    const links = [
      {
        href: "/:id",
        rel: "users",
        type: "GET"
      },
      {
        href: "/:id",
        rel: "users",
        type: "PUT"
      },
      {
        href: "/:id",
        rel: "users",
        type: "DELETE"
      }
    ]
    res.json({ users, links })
  })
  .post((req, res) => {
    const newUser = {
      id: users.length + 1,
      splashTag: req.body.splashTag,
      userName: req.body.userName,
      species: req.body.species,
      favWeaponKit: req.body.favWeaponKit,
      favStage: req.body.favStage,
      img: ""
    }
    users.push(newUser)
    res.json({ newUser, users })
  })

router
  .route("/users/:id")
  .get((req, res) => {
    const user = users[req.params.id - 1]
    const links = [
      {
        href: "/",
        rel: "users",
        type: "PUT"
      },
      {
        href: "/",
        rel: "users",
        type: "DELETE"
      }
    ]
    res.json({ user, links })
  })
  .put((req, res) => {
    const user = users[req.params.id - 1]
    user.userName = req.body.userName
    user.splashTag = req.body.splashTag
    user.species = req.body.species
    user.favWeaponKit = req.body.favWeaponKit
    user.favStage = req.body.favStage
    users[req.params.id - 1] = user
    res.json(users)
  })
  .delete((req, res) => {
    users.splice(req.params.id - 1, 1)
    users.forEach((user, idx) => {
      user.id = idx + 1
    })
    res.json(users)
  })

router
  .route("/stages")
  .get((req, res) => {
    const links = [
      {
        href: "/:id",
        rel: "users",
        type: "GET"
      }
    ]
    res.json({ stages, links })
  })

router
  .route("/stages/:id")
  .get((req, res) => {
    res.json(stages[req.params.id - 1])
  })

router
  .route("/kits")
  .get((req, res) => {
    const links = [
      {
        href: "/:id",
        rel: "users",
        type: "GET"
      }
    ]
    res.json({ weaponKits, links })
  })

router
  .route("/kits/:id")
  .get((req, res) => {
    res.json(weaponKits[req.params.id - 1])
    })

module.exports = router