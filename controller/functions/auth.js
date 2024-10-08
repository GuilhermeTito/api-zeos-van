const Passageiro = require("../../model/passageiro")
const Motorista = require("../../model/motorista")

const cadastrarPassageiro = async (req, res) => {
    try {
        await Passageiro.create({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            senha: req.body.senha
        })
        
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

const cadastrarMotorista = async (req, res) => {
    try {
        await Motorista.create({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            senha: req.body.senha
        })
        
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

module.exports = { cadastrarPassageiro, cadastrarMotorista }