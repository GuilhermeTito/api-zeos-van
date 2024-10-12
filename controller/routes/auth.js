const { Router } = require("express")
const funcoes = require("../functions/auth")

const roteador = Router()

roteador.get("/passageiro", funcoes.loginPassageiro)
roteador.get("/motorista", funcoes.loginMotorista)

module.exports = roteador