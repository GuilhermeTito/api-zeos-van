const { Router } = require("express")
const funcoes = require("../functions/passageiro")

const roteador = Router()

roteador.post("/", funcoes.cadastrarPassageiro)
roteador.get("/email-ja-cadastrado", funcoes.emailJaCadastrado)

module.exports = roteador