const Passageiro = require("../../model/passageiro")
const bcrypt = require("bcrypt")

const cadastrarPassageiro = async (req, res) => {
    try {
        senhaCriptografada = await bcrypt.hash(req.body.senha, 12);
        
        await Passageiro.create({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            senha: senhaCriptografada
        })
        
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

module.exports = { cadastrarPassageiro }