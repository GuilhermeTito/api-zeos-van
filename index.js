const express = require("express")
const bodyParser = require('body-parser')
const rotasAuth = require("./controller/routes/auth")
const rotasPassageiro = require("./controller/routes/passageiro")
const rotasMotorista = require("./controller/routes/motorista")
const rotasTurma = require("./controller/routes/turma")
const rotasViagemMarcada = require("./controller/routes/viagem-marcada")
const rotasPassageiroTurma = require("./controller/routes/passageiro-turma")
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
app.use("/turma", rotasTurma)
app.use("/viagem-marcada", rotasViagemMarcada)
app.use("/passageiro-turma", rotasPassageiroTurma)

app.listen(process.env.API_PORT, process.env.API_HOST)