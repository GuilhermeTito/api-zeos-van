const Motorista = require("../../model/motorista")
const Passageiro = require("../../model/passageiro")
const bcrypt = require('bcrypt');

const loginPassageiro = async (req, res) => {
    try {
        let statusCode = 404
        let autenticado = false
        
        const passageiro = await Passageiro.findOne({
            where: {
                email: req.body.email
            }
        })

        if(passageiro != null){
            autenticado = await bcrypt.compare(req.body.senha, passageiro.senha)

            if(autenticado){
                statusCode = 200
            } else {
                statusCode = 401
            }
        }

        res.status(statusCode).send({autenticado: autenticado})
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

const loginMotorista = async (req, res) => {
    try {
        let statusCode = 404
        let autenticado = false
        
        const motorista = await Motorista.findOne({
            where: {
                email: req.body.email
            }
        })

        if(motorista != null){
            autenticado = await bcrypt.compare(req.body.senha, motorista.senha)

            if(autenticado){
                statusCode = 200
            } else {
                statusCode = 401
            }
        }

        res.status(statusCode).send({autenticado: autenticado})
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

module.exports = { loginPassageiro, loginMotorista }