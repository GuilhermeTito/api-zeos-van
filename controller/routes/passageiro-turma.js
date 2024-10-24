const { Router } = require("express")
const funcoes = require("../functions/passageiro-turma")

const roteador = Router()

roteador.post("/", funcoes.cadastrarPassageiroTurma)

module.exports = roteador