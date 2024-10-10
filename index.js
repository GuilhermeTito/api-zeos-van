const express = require("express")
const bodyParser = require('body-parser')
const rotasAuth = require("./controller/routes/auth")
const rotasPassageiro = require("./controller/routes/passageiro")
const rotasMotorista = require("./controller/routes/motorista")
const db = require("./model/conexao")
require("dotenv").config()

const app = express()

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send(db.config.database)
})

app.use("/auth", rotasAuth)

app.use("/passageiro", rotasPassageiro)

app.use("/motorista", rotasMotorista)

app.listen(process.env.API_PORT)