const express = require("express")
const db = require("./model/conexao")
require("dotenv").config()

const app = express()

app.get("/", (req, res) => {
    res.send(db.config.database)
})

app.listen(process.env.API_PORT)