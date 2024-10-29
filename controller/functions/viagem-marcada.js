const ViagemMarcada = require("../../model/viagem-marcada")

const cadastrarViagemMarcada = async (req, res) => {
    try {        
        await ViagemMarcada.create({
            id: req.body.id,
            id_passageiro: req.body.id_passageiro,
            data_viagem: req.body.data_viagem,
            ponto_partida: req.body.ponto_partida,
            latitude_partida: req.body.latitude_partida,
            longitude_partida: req.body.longitude_partida,
            horario_partida: req.body.horario_partida,
            ponto_chegada: req.body.ponto_chegada,
            latitude_chegada: req.body.latitude_chegada,
            longitude_chegada: req.body.longitude_chegada,
            horario_chegada: req.body.horario_chegada
        })
        
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

const atualizarViagemMarcada = async (req, res) => {
    const viagemMarcada = await ViagemMarcada.findOne({
        where: {
            email: req.body.email
        }
    })

    if(viagemMarcada != null){
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }

    try {
        await viagemMarcada.update({
            data_viagem: req.body.data_viagem,
            ponto_partida: req.body.ponto_partida,
            latitude_partida: req.body.latitude_partida,
            longitude_partida: req.body.longitude_partida,
            horario_partida: req.body.horario_partida,
            ponto_chegada: req.body.ponto_chegada,
            latitude_chegada: req.body.latitude_chegada,
            longitude_chegada: req.body.longitude_chegada,
            horario_chegada: req.body.horario_chegada
        })
        
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

const excluirViagemMarcada = async (req, res) => {
    try {
        await ViagemMarcada.destroy({
            where: {
                id: req.body.id
            }
        })

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

module.exports = { cadastrarViagemMarcada, atualizarViagemMarcada, excluirViagemMarcada }