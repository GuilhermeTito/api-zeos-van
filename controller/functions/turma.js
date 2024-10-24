const Turma = require("../../model/turma")

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

module.exports = { cadastrarTurma }