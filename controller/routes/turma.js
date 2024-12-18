const { Router } = require("express")
const funcoes = require("../functions/turma")

const roteador = Router()

roteador.get("/", funcoes.buscarTurma)
roteador.get("/todas", funcoes.buscarTodasAsTurmas)
roteador.post("/", funcoes.cadastrarTurma)
roteador.delete("/", funcoes.excluirTurma)

module.exports = roteador