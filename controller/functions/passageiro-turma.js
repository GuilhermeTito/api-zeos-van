const PassageiroTurma = require("../../model/passageiro-turma")

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

module.exports = { cadastrarPassageiroTurma }