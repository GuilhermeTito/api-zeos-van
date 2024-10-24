const db = require("./conexao")
const { DataTypes, Model } = require("sequelize")

class ViagemMarcada extends Model {}

ViagemMarcada.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        id_passageiro: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        data_viagem: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ponto_partida: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horario_partida: {
            type: DataTypes.TIME,
            allowNull: false
        },
        ponto_chegada: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horario_chegada: {
            type: DataTypes.TIME,
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: "viagem_marcada"
    }
)

module.exports = ViagemMarcada