const { Op } = require("sequelize")
const Motorista = require("../../model/motorista")
const bcrypt = require("bcrypt")

const buscarMotorista = async (req, res) => {    
    const motorista = await Motorista.findOne({
        where: {
            id: req.query.id
        }
    })

    if(motorista == null){
        res.sendStatus(404)
        return
    }

    const objetoRetono = {
        id: motorista.id,
        nome: motorista.nome,
        email: motorista.email,
        telefone: motorista.telefone
    }

    res.status(200).send(objetoRetono)
}

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
    try {
        const motorista = await Motorista.findOne({
            where: {
                email: req.query.email
            }
        })

        if(motorista != null){
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

module.exports = { buscarMotorista, cadastrarMotorista, atualizarMotorista, emailJaCadastrado }