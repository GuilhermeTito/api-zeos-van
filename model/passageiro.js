const db = require("./conexao")
const { DataTypes, Model } = require("sequelize")

class Passageiro extends Model {}

Passageiro.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        telefone: {
            type: DataTypes.STRING
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data_cadastro: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        ponto_partida_padrao: {
            type: DataTypes.STRING,
        },
        horario_partida_padrao:{
            type: DataTypes.TIME
        },
        ponto_chegada_padrao: {
            type: DataTypes.STRING
        },
        horario_chegada_padrao: {
            type: DataTypes.TIME
        }
    },
    {
        sequelize: db,
        modelName: "passageiro"
    }
);

module.exports = Passageiro