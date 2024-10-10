const Passageiro = require("../../model/passageiro")

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

module.exports = { cadastrarPassageiro }