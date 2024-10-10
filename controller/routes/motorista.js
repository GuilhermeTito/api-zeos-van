const { Router } = require("express")
const funcoes = require("../functions/motorista")

const roteador = Router()

roteador.post("/", funcoes.cadastrarMotorista)

module.exports = roteador