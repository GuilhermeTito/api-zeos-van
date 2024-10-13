const Motorista = require("../../model/motorista")
const bcrypt = require("bcrypt")

const cadastrarMotorista = async (req, res) => {
    try {
        senhaCriptografada = await bcrypt.hash(req.body.senha, 12);
        
        await Motorista.create({
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

module.exports = { cadastrarMotorista }