const { Router } = require("express")
const funcoes = require("../functions/motorista")

const roteador = Router()

roteador.get("/", funcoes.buscarMotorista)
roteador.post("/", funcoes.cadastrarMotorista)
roteador.patch("/", funcoes.atualizarMotorista)
roteador.get("/email-ja-cadastrado", funcoes.emailJaCadastrado)

module.exports = roteador