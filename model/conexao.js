const { Sequelize } = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
    }
)

async function testarConexao() {
    try {
        await sequelize.authenticate()  
        console.log('Conexão com o banco de dados estabelecida com sucesso!')
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error)
    }
}

testarConexao()

module.exports = sequelize