const Motorista = require("../../model/motorista")
const Passageiro = require("../../model/passageiro")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config

const loginPassageiro = async (req, res) => {
    try {
        let statusCode = 404
        let autenticado = false
        let accessToken = null
        
        const passageiro = await Passageiro.findOne({
            where: {
                email: req.body.email
            }
        })

        if(passageiro != null){
            statusCode = 401
            autenticado = await bcrypt.compare(req.body.senha, passageiro.senha)

            if(autenticado){
                statusCode = 200
                accessToken = jwt.sign(
                    {
                        tipoUsuario: "passageiro",
                        id: passageiro.id,
                        nome: passageiro.nome
                    },
                    process.env.JWT_PRIVATE_KEY
                )
            }
        }

        res.status(statusCode).send({ accessToken: accessToken })
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

const loginMotorista = async (req, res) => {
    try {
        let statusCode = 404
        let autenticado = false
        let accessToken = null

        const motorista = await Motorista.findOne({
            where: {
                email: req.body.email
            }
        })

        if(motorista != null){
            statusCode = 401
            autenticado = await bcrypt.compare(req.body.senha, motorista.senha)

            if(autenticado){
                statusCode = 200
                accessToken = jwt.sign(
                    {
                        tipoUsuario: "motorista",
                        id: motorista.id,
                        nome: motorista.nome
                    },
                    process.env.JWT_PRIVATE_KEY
                )
            }
        }

        res.status(statusCode).send({ accessToken: accessToken })
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

const validarToken = (req, res) => {
    let authHeader = null
    let accessToken = null
    
    try {
        authHeader = req.headers["authorization"]
        
        if(authHeader == null){
            res.sendStatus(400)
            return
        }

        accessToken = authHeader.split(" ")[1]

        if(accessToken == null){
            res.sendStatus(400)
            return
        }
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }    
        
    try {
        const teste = jwt.verify(accessToken, process.env.JWT_PRIVATE_KEY)

        res.status(200).send(teste)
    } catch (error) {
        res.status(403).send(error.message)
        console.log(error)
    }
}

module.exports = { loginPassageiro, loginMotorista, validarToken }