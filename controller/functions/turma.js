const Turma = require("../../model/turma")

const buscarTodasAsTurmas = async (req, res) => {
    const turmas = await Turma.findAll({
        where: {
            id_motorista: req.query.id_motorista
        },
        order: ["id"]
    })

    if(turmas == null){
        res.sendStatus(404)
        return
    }

    res.status(200).send(turmas)
}

const cadastrarTurma = async (req, res) => {
    try {        
        await Turma.create({
            id_motorista: req.body.id_motorista,
            nome: req.body.nome
        })
        
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

const atualizarTurma = async (req, res) => {
    const turma = await Turma.findOne({
        where: {
            id: req.body.id
        }
    })

    try {
        await turma.update({
            nome: req.body.nome
        })
        
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

const excluirTurma = async (req, res) => {
    try {
        await Turma.destroy({
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

module.exports = { buscarTodasAsTurmas, cadastrarTurma, atualizarTurma, excluirTurma }