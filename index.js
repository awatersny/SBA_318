const express = require("express")
const userRoutes = require("./routes/users")
const kitRoutes = require("./routes/weaponKits")
const stageRoutes = require("./routes/stages")
const indexRoute = require("./routes/index")
const app = express()
const port = 3000

app.use(express.static("./styles"))
app.use(express.static("./assets"))

app.use("/", indexRoute)
app.use("/users", userRoutes)
app.use("/kits", kitRoutes)
app.use("/stages", stageRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`)
})