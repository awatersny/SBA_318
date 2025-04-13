const express = require("express")
const error = require("./utilities/error")
const userRoutes = require("./routes/users")
const userAPIRoutes = require("./routes/userAPI")
const kitRoutes = require("./routes/weaponKits")
const stageRoutes = require("./routes/stages")
const indexRoute = require("./routes/index")
const bodyParser = require("body-parser")
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(express.static("./styles"))
app.use(express.static("./assets"))

app.use((req, res, next) => {
  const time = new Date()
  console.log("-----")
  if(req.url !== "/favicon.ico") {
    console.log(`${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`)
  }
  if(req.body){
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:")
      console.log(req.body)
    }
  }
  next();
});

app.set("views", "./views")
app.set("view engine", "ejs")

app.use("/", indexRoute)
app.use("/users", userRoutes)
app.use("/api/users", userAPIRoutes)
app.use("/api/kits", kitRoutes)
app.use("/api/stages", stageRoutes)

app.use((req, res, next) => {
  next(error(404, "Oops!  There's nothing here."));
});

app.use((err, req, res, next) => {
  if(req.url !== "/favicon.ico") {
    console.log(`${err.status} Not found.`)
  }
  res.status(err.status || 500);
  if(/\/api\/+/.test(req.url)) {
    res.json({error: `${err.status} ${err.message}`})
  } else {
    const options = {
      type: "error",
      title: `${err.status} Error`,
      content: err.message
    }
    res.render("info", options)
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`)
})