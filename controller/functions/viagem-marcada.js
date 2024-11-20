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

        res.status(200).send(viagens)    
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

const buscarCoordenadasPorTurmaEData = async (req, res) => {
    try {
        const coordenadas = await db.query(
            "SELECT DISTINCT  " +
            "    IF(horario_vm IS NOT NULL, horario_vm, horario_padrao) as horario, " +
            "    if(latitude_vm is not null, latitude_vm, latitude_padrao) as latitude, " +
            "    if(longitude_vm is not null, longitude_vm, longitude_padrao) as longitude " +
            "from " +
            "( " +
            "    SELECT DISTINCT coord_padrao.id_passageiro, coord_padrao.horario_padrao, coord_padrao.latitude_padrao, coord_padrao.longitude_padrao, coord_padrao.tipo, if(coord_vm.vai_no_dia is not null, coord_vm.vai_no_dia, 1) as vai_no_dia, coord_vm.horario_vm, coord_vm.latitude_vm, coord_vm.longitude_vm " +
            "    from " +
            "    ( " +
            "        SELECT p.id as id_passageiro, p.horario_partida_padrao as horario_padrao, p.latitude_partida_padrao as latitude_padrao, p.longitude_partida_padrao as longitude_padrao, 'partida' as tipo " +
            "        from passageiro as p " +
            "        where p.id in (select id_passageiro from passageiro_turma where id_turma = " + req.query.id_turma + ") " +
            "        union " +
            "        SELECT p.id as id_passageiro, p.horario_chegada_padrao as horario_padrao, p.latitude_chegada_padrao as latitude_padrao, p.longitude_chegada_padrao as longitude_padrao, 'chegada' as tipo " +
            "        from passageiro as p " +
            "        where p.id in (select id_passageiro from passageiro_turma where id_turma = " + req.query.id_turma + ") " +
            "    ) as coord_padrao " +
            "    left join " +
            "    ( " +
            "        SELECT DISTINCT vm.id_passageiro, vm.vai_no_dia, vm.horario_partida as horario_vm, vm.latitude_partida as latitude_vm, vm.longitude_partida as longitude_vm, 'partida' as tipo " +
            "        FROM viagem_marcada AS vm " +
            "        WHERE vm.id_passageiro in (select id_passageiro from passageiro_turma where id_turma = " + req.query.id_turma + ") " +
            "            and vm.data_viagem = '" + req.query.data_viagem + "' " +
            "        UNION " +
            "        SELECT DISTINCT vm.id_passageiro, vm.vai_no_dia, vm.horario_chegada as horario_vm, vm.latitude_chegada as latitude_vm, vm.longitude_chegada as longitude_vm, 'chegada' as tipo " +
            "        FROM viagem_marcada AS vm " +
            "        WHERE vm.id_passageiro in (select id_passageiro from passageiro_turma where id_turma = " + req.query.id_turma + ") " +
            "            and vm.data_viagem = '" + req.query.data_viagem + "' " +
            "    ) as coord_vm " +
            "    on coord_padrao.id_passageiro = coord_vm.id_passageiro " +
            "    and coord_padrao.tipo = coord_vm.tipo " +
            ") as coordenadas " +
            "where vai_no_dia = 1 " +
            "order by horario;",
            { type: QueryTypes.SELECT }
        )

        if(coordenadas == null || coordenadas.length <= 0 ){
            res.sendStatus(404)
            return
        }

        const origem = coordenadas[0]
        const destino = coordenadas[coordenadas.length - 1]
        const waypoints = coordenadas.slice(1, coordenadas.length - 1)

        res.status(200).send({
            origem: origem,
            destino: destino,
            waypoints: waypoints
        })
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
                id: req.body.id
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
    buscarCoordenadasPorTurmaEData,
    cadastrarViagemMarcada,
    atualizarViagemMarcada,
    excluirViagemMarcada
}