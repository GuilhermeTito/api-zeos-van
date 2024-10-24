const db = require("./conexao")
const { DataTypes, Model } = require("sequelize")

class PassageiroTurma extends Model {}

PassageiroTurma.init(
    {
        id_passageiro: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_turma: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        sequelize: db,
        modelName: "passageiro_turma"
    }
)