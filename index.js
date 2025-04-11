const express = require("express")
const userRoutes = require("./routes/users")
const kitRoutes = require("./routes/weaponKits")
const stageRoutes = require("./routes/stages")
const indexRoute = require("./routes/index")
const app = express()
const port = 3000

app.use(express.static("./styles"))
app.use(express.static("./assets"))

app.use((req, res, next) => {
  const time = new Date()
  console.log("-----")
  console.log(`${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`)
  if(req.body){
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:")
      console.log(`${JSON.stringify(req.body)}`)
    }
  }
  next();
});

app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.set("views", "./views")
app.set("view engine", "ejs")

app.use("/", indexRoute)
app.use("/users", userRoutes)
app.use("/kits", kitRoutes)
app.use("/stages", stageRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`)
})