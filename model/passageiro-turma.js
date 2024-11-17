const db = require("./conexao")
const { DataTypes, Model } = require("sequelize")
const Passageiro = require("./passageiro")

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

Passageiro.hasMany(PassageiroTurma, { foreignKey: 'id_passageiro' })
PassageiroTurma.belongsTo(Passageiro, { foreignKey: 'id_passageiro' })

module.exports = PassageiroTurma