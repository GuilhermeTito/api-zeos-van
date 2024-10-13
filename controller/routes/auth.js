const { Router } = require("express")
const funcoes = require("../functions/auth")

const roteador = Router()

roteador.post("/passageiro", funcoes.loginPassageiro)
roteador.post("/motorista", funcoes.loginMotorista)
roteador.get("/validar-token", funcoes.validarToken)

module.exports = roteador