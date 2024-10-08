const { Router } = require("express")
const funcoes = require("../functions/auth")

const roteador = Router()

roteador.post("/cadastrar-passageiro", funcoes.cadastrarPassageiro)

roteador.post("/cadastrar-motorista", funcoes.cadastrarMotorista)

module.exports = roteador