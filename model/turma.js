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
        }
    },
    {
        sequelize: db,
        modelName: "turma"
    }
)

module.exports = Turma