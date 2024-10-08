const express = require("express")
const bodyParser = require('body-parser')
const rotasAuth = require("./controller/routes/auth")
const db = require("./model/conexao")
require("dotenv").config()

const app = express()

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send(db.config.database)
})

app.use("/auth", rotasAuth)

app.listen(process.env.API_PORT)