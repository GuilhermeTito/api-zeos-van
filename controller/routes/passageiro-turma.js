const { Router } = require("express")
const funcoes = require("../functions/passageiro-turma")

const roteador = Router()

roteador.get("/todos", funcoes.buscarTodosOsPassageiroTurma)
roteador.post("/", funcoes.cadastrarPassageiroTurma)

module.exports = roteador