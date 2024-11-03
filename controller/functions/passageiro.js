const { Op } = require("sequelize")
const Passageiro = require("../../model/passageiro")
const bcrypt = require("bcrypt")

const buscarPassageiro = async (req, res) => {    
    const passageiro = await Passageiro.findOne({
        where: {
            id: req.query.id
        }
    })

    if(passageiro == null){
        res.sendStatus(404)
        return
    }

    const objetoRetono = {
        id: passageiro.id,
        nome: passageiro.nome,
        email: passageiro.email,
        telefone: passageiro.telefone,
        ponto_partida_padrao: passageiro.ponto_partida_padrao,
        horario_partida_padrao: passageiro.horario_partida_padrao,
        ponto_chegada_padrao: passageiro.ponto_chegada_padrao,
        horario_chegada_padrao: passageiro.horario_chegada_padrao
    }

    res.status(200).send(objetoRetono)
}

const cadastrarPassageiro = async (req, res) => {
    try {
        senhaCriptografada = await bcrypt.hash(req.body.senha, 12)
        
        await Passageiro.create({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            senha: senhaCriptografada,
            ponto_partida_padrao: req.body.ponto_partida_padrao,
            latitude_partida_padrao: req.body.latitude_partida_padrao,
            longitude_partida_padrao: req.body.longitude_partida_padrao,
            horario_partida_padrao: req.body.horario_partida_padrao,
            ponto_chegada_padrao: req.body.ponto_chegada_padrao,
            latitude_chegada_padrao: req.body.latitude_chegada_padrao,
            longitude_chegada_padrao: req.body.longitude_chegada_padrao,
            horario_chegada_padrao: req.body.horario_chegada_padrao
        })
        
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

const atualizarPassageiro = async (req, res) => {
    const passageiro = await Passageiro.findOne({
        where: {
            id: req.query.id
        }
    })

    if(passageiro != null){
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }

    try {
        senhaCriptografada = await bcrypt.hash(req.body.senha, 12)

        await passageiro.update({
            nome: req.body.nome,
            telefone: req.body.telefone,
            senha: senhaCriptografada,
            ponto_partida_padrao: req.body.ponto_partida_padrao,
            latitude_partida_padrao: req.body.latitude_partida_padrao,
            longitude_partida_padrao: req.body.longitude_partida_padrao,
            horario_partida_padrao: req.body.horario_partida_padrao,
            ponto_chegada_padrao: req.body.ponto_chegada_padrao,
            latitude_chegada_padrao: req.body.latitude_chegada_padrao,
            longitude_chegada_padrao: req.body.longitude_chegada_padrao,
            horario_chegada_padrao: req.body.horario_chegada_padrao
        })
        
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

const emailJaCadastrado = async (req, res) => {
    try {
        const passageiro = await Passageiro.findOne({
            where: {
                email: req.query.email
            }
        })

        if(passageiro != null){
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

module.exports = { buscarPassageiro, cadastrarPassageiro, atualizarPassageiro, emailJaCadastrado }