require("dotenv").config()
const fs = require("fs")
const https = require("https")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: ["*"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
)
app.use(cookieParser())
app.get("/", function (req, res) {
  res.send("이게 보인다면 파이프라인 자동배포까지 모두 성공12345")
})

const HTTPS_PORT = process.env.HTTPS_PORT || 80

let server
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8")
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8")
  const credentials = { key: privateKey, cert: certificate }

  server = https.createServer(credentials, app)
  server.listen(HTTPS_PORT, () => console.log("https server runnning"))
} else {
  server = app.listen(HTTPS_PORT, () => console.log("http server runnning"))
}
module.exports = server
