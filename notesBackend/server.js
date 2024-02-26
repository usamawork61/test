const express = require("express")
const config = require("config")
const helmet = require("helmet")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const morgan = require("morgan")
const useragent = require("express-useragent")
const apisRoutesCheckMiddleware = require("./app/middlewares/apisRoutesCheckMiddleware")
const app = express()

// MONGODB CONNECTION //
mongoose.set("strictQuery", true)
mongoose.set({ debug: true })
mongoose
  .connect(config.mongoHost, {
    serverSelectionTimeoutMS: 10000, 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DataBase is Connected successfully")
  })
  .catch((error) => {
    console.log("Connection Failed", error)
  })

// MIDDLEWARES //
app.use(useragent.express())
app.use(helmet())
app.use(bodyParser.json({ strict: false }))
app.use(express.static("public"))

//CORS
var corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

//LOGS
app.use(morgan("combined"))

// CUSTOM MIDDLEWARE TO AUTHORIZE AND AUTHENTICATE USER
app.use(function (req, res, next) {
  apisRoutesCheckMiddleware(req, res, next)
})

app.use("/api", require("./app/routes/notes").router)

// app.use(function (req, res, next) {
//   authMiddleware(req, res, next)
// })

// app.use(function (req, res, next) {
//   checkAccessMiddleware(req, res, next)
// })


app.listen(config.port, () =>
  console.log(`Server is Running on PORT ${config.port}`)
)
