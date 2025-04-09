const express = require("express")
const userRoutes = require("./routes/users")
const kitRoutes = require("./routes/weaponKits")
const app = express()
const port = 3000

app.get("/", (req, res) => {
  res.send("Starting from here.")
})
app.use("/users", userRoutes)
app.use("/kits", kitRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`)
})