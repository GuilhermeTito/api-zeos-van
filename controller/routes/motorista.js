const { Router } = require("express")
const funcoes = require("../functions/motorista")

const roteador = Router()

roteador.post("/", funcoes.cadastrarMotorista)
roteador.get("/email-ja-cadastrado", funcoes.emailJaCadastrado)

module.exports = roteador