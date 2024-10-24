const ViagemMarcada = require("../../model/viagem-marcada")

const cadastrarViagemMarcada = async (req, res) => {
    try {        
        await ViagemMarcada.create({
            id: req.body.id,
            id_passageiro: req.body.id_passageiro,
            data_viagem: req.body.data_viagem,
            ponto_partida: req.body.ponto_partida,
            horario_partida: req.body.horario_partida,
            ponto_chegada: req.body.ponto_chegada,
            horario_chegada: req.body.horario_chegada
        })
        
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

module.exports = { cadastrarViagemMarcada }