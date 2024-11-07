const { Router } = require("express")
const funcoes = require("../functions/viagem-marcada")

const roteador = Router()

roteador.get("/", funcoes.buscarViagemMarcada)
roteador.post("/", funcoes.cadastrarViagemMarcada)
roteador.patch("/", funcoes.atualizarViagemMarcada)
roteador.delete("/", funcoes.excluirViagemMarcada)

module.exports = roteador