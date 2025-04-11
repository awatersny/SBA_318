const express = require("express")
const userRoutes = require("./routes/users")
const kitRoutes = require("./routes/weaponKits")
const stageRoutes = require("./routes/stages")
const indexRoute = require("./routes/index")
const bodyParser = require("body-parser")
const error = require("./utilities/error")
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(express.static("./styles"))
app.use(express.static("./assets"))

app.use((err, req, res, next) => {
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

app.set("views", "./views")
app.set("view engine", "ejs")

app.use("/", indexRoute)
app.use("/users", userRoutes)
app.use("/kits", kitRoutes)
app.use("/stages", stageRoutes)

app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log(err)
  res.json({ error: `${err.status} ${err.message}` });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`)
})