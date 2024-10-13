const db = require("./conexao")
const { DataTypes, Model } = require("sequelize")

class Motorista extends Model {}

Motorista.init(
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
      type: DataTypes.STRING
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
    }
  },
  {
    sequelize: db,
    modelName: "motorista"
  }
);

module.exports = Motorista