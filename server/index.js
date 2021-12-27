require("dotenv").config()
const fs = require("fs")
const path = require("path")
const https = require("https")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const controllers = require("./controllers")
const multer = require("multer")
const logger = require("morgan")

const url =
    process.env.API_URL ||
    "http://animalchat-bucket.s3-website.ap-northeast-2.amazonaws.com"

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
    cors({
        origin: [url],
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    })
)
app.use(logger("dev")) //서버요청 로그
app.use(cookieParser())
app.use(express.static("public"))

const storage = multer.diskStorage({
    destination: "./public/img/",
    filename: function (req, file, cb) {
        cb(null, "imgfile" + Date.now() + path.extname(file.originalname))
    },
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 13 * 1024 * 1024 },
})

app.get("/", (req, res) => {
    res.send("Hello World!")
})

//get
app.get("/auth", controllers.auth)
app.get("/postlist", controllers.postlist)
app.get("/userinfo", controllers.userinfo) 

//post
app.post("/sendcomment", controllers.sendcomment)
app.post("/like", controllers.like) 
app.post("/commentlist", controllers.commentlist)
app.post("/signin", controllers.signin) 
app.post("/checkpw", controllers.checkpw)
app.post("/signout", controllers.signout) 
app.post("/signup", controllers.signup)
app.post("/readlike", controllers.readlike)
app.post("/sendpost", upload.single("img"), controllers.sendpost) 
app.post("/profilephoto", upload.single("img"), controllers.profilephoto)
app.post("/animalphoto", upload.single("img"), controllers.animalphoto)

//put(전체)
app.put("/editpw", controllers.editpw)

//patch(일부)
app.patch("/editpost", upload.single("img"), controllers.editpost)
app.patch("/edituserinfo", controllers.edituserinfo) 


//delete
app.delete("/deletecomment", controllers.deletecomment) 
app.delete("/deletepost", controllers.deletepost) 
app.delete("/removeuser", controllers.removeuser) 
app.delete("/deleteanimal", controllers.deleteanimal) 

const HTTPS_PORT = process.env.HTTPS_PORT || 80

let server
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
    // https 프로토콜 사용 시
    const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8")
    const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8")
    const credentials = { key: privateKey, cert: certificate }
    server = https.createServer(credentials, app)
    server.listen(HTTPS_PORT, () => console.log("https server runnning"))
} else {
    server = app.listen(HTTPS_PORT, () => console.log("http server runnning"))
}
module.exports = server
