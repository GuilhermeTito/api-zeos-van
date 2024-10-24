const { Router } = require("express")
const funcoes = require("../functions/turma")

const roteador = Router()

roteador.post("/", funcoes.cadastrarTurma)

module.exports = roteador