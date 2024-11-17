const PassageiroTurma = require("../../model/passageiro-turma")
const Passageiro = require("../../model/passageiro")

const buscarTodosOsPassageiroTurma = async (req, res) => {
    const passageirosTurma = await PassageiroTurma.findAll({
        where: {
            id_turma: req.query.id_turma
        },
        include: [{
            model: Passageiro
        }]
    })

    if(passageirosTurma == null){
        res.sendStatus(404)
        return
    }

    res.status(200).send(passageirosTurma)
}

const cadastrarPassageiroTurma = async (req, res) => {
    try {        
        await PassageiroTurma.create({
            id_passageiro: req.body.id_passageiro,
            id_turma: req.body.id_turma
        })
        
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

const deletarPassageiroTurma = async (req, res) => {
    try {
        await PassageiroTurma.destroy({
            where: {
                id_turma: req.body.id_turma,
                id_passageiro: req.body.id_passageiro
            }
        })

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

module.exports = { buscarTodosOsPassageiroTurma, cadastrarPassageiroTurma,deletarPassageiroTurma }