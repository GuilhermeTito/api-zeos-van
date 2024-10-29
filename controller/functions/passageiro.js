const Passageiro = require("../../model/passageiro")
const bcrypt = require("bcrypt")

const cadastrarPassageiro = async (req, res) => {
    try {
        senhaCriptografada = await bcrypt.hash(req.body.senha, 12);
        
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

const emailJaCadastrado = async (req, res) => {
    const passageiro = await Passageiro.findOne({
        where: {
            email: req.body.email
        }
    })

    if(passageiro != null){
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
}

module.exports = { cadastrarPassageiro, emailJaCadastrado }