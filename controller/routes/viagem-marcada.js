const { Router } = require("express")
const funcoes = require("../functions/viagem-marcada")

const roteador = Router()

roteador.post("/", funcoes.cadastrarViagemMarcada)

module.exports = roteador