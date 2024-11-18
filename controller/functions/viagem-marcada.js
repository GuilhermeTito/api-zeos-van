const { QueryTypes } = require("sequelize")
const db = require("../../model/conexao")
const ViagemMarcada = require("../../model/viagem-marcada")

const buscarViagemMarcada = async (req, res) => {
    try {
        let viagemMarcada

        if(req.query.id != null){
            viagemMarcada = await ViagemMarcada.findOne({
                where: {
                    id: req.query.id
                }
            })
        } else {
            viagemMarcada = await ViagemMarcada.findOne({
                where: {
                    id_passageiro: req.query.id_passageiro,
                    data_viagem: req.query.data_viagem
                }
            })
        }

        if(viagemMarcada == null){
            res.sendStatus(404)
            return
        }

        res.status(200).send(viagemMarcada)
    } catch (error) {
        res.sendStatus(400)
    }
}

const buscarTodasAsViagensMarcadas = async (req, res) => {       
    try {
        const viagens = await ViagemMarcada.findAll({
            where: {
                id_passageiro: req.query.id_passageiro
            },
            order: ["data_viagem"]
        })

        if(viagens == null){
            res.sendStatus(404)
            return
        }

        res.status(200).send(viagens)    
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

const buscarTodasAsViagensMarcadasPorMotorista = async (req, res) => {
    try {
        const viagens = await db.query(
            "SELECT DISTINCT vm.*, p.nome FROM viagem_marcada AS vm INNER JOIN passageiro AS p ON vm.id_passageiro = p.id INNER JOIN passageiro_turma AS pt ON p.id = pt.id_passageiro INNER JOIN turma AS t ON pt.id_turma = t.id INNER JOIN motorista AS m ON t.id_motorista = m.id WHERE m.id = " + req.query.id_motorista + " ORDER BY data_viagem;",
            { type: QueryTypes.SELECT }
        )

        if(viagens == null){
            res.sendStatus(404)
            return
        }

        console.log(viagens)

        res.status(200).send(viagens)    
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

const cadastrarViagemMarcada = async (req, res) => {
    try {        
        let vai_no_dia = 0
        
        if(req.body.vai_no_dia){
            vai_no_dia = 1
        }

        await ViagemMarcada.create({
            id_passageiro: req.body.id_passageiro,
            data_viagem: req.body.data_viagem,
            vai_no_dia: vai_no_dia,
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
    try {    
        let viagemMarcada

        if(req.query.id != null){
            viagemMarcada = await ViagemMarcada.findOne({
                where: {
                    id: req.query.id
                }
            })
        } else {
            viagemMarcada = await ViagemMarcada.findOne({
                where: {
                    id_passageiro: req.query.id_passageiro,
                    data_viagem: req.query.data_viagem
                }
            })
        }

        if(viagemMarcada == null){
            res.sendStatus(404)
            return
        }

        let vai_no_dia = 0
        
        if(req.body.vai_no_dia){
            vai_no_dia = 1
        }

        await viagemMarcada.update({
            data_viagem: req.body.data_viagem,
            vai_no_dia: vai_no_dia,
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
                id: req.query.id
            }
        })

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

module.exports = {
    buscarViagemMarcada,
    buscarTodasAsViagensMarcadas,
    buscarTodasAsViagensMarcadasPorMotorista,
    cadastrarViagemMarcada,
    atualizarViagemMarcada,
    excluirViagemMarcada
}