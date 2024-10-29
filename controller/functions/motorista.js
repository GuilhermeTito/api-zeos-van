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

const atualizarMotorista = async (req, res) => {
    const motorista = await Motorista.findOne({
        where: {
            [Op.or]: {
                id: req.body.id,
                email: req.body.email
            }
        }
    })

    if(motorista != null){
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }

    try {
        senhaCriptografada = await bcrypt.hash(req.body.senha, 12)

        await motorista.update({
            nome: req.body.nome,
            telefone: req.body.telefone,
            senha: senhaCriptografada
        })
        
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

const emailJaCadastrado = async (req, res) => {
    const motorista = await Motorista.findOne({
        where: {
            email: req.body.email
        }
    })

    if(motorista != null){
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
}

module.exports = { cadastrarMotorista, atualizarMotorista, emailJaCadastrado }