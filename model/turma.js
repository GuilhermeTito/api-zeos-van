const db = require("./conexao")
const { DataTypes, Model } = require("sequelize")

class Turma extends Model {}

Turma.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        id_motorista: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_passageiro_origem: {
            type: DataTypes.INTEGER
        },
        id_passageiro_destino: {
            type:DataTypes.INTEGER
        }
    },
    {
        sequelize: db,
        modelName: "turma"
    }
)

module.exports = Turma