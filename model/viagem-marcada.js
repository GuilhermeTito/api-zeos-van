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
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        vai_no_dia: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        ponto_partida: {
            type: DataTypes.STRING,
            allowNull: false
        },
        latitude_partida: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        longitude_partida: {
            type: DataTypes.DOUBLE,
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
        latitude_chegada: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        longitude_chegada: {
            type: DataTypes.DOUBLE,
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