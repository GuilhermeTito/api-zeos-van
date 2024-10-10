const { Router } = require("express")
const funcoes = require("../functions/passageiro")

const roteador = Router()

roteador.post("/", funcoes.cadastrarPassageiro)

module.exports = roteador