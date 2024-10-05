const express = require("express")
const sequelize = require("./model/conexao")
require("dotenv").config()

const app = express()

app.get("/", (req, res) => {
    res.send(sequelize.config.database)
})

app.listen(process.env.API_PORT)