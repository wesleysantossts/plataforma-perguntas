const sequelize = require("sequelize");
const connection = require("../../database");

// .define("nome desejado para dar para a tabela", {type: sequelize.TIPO, allowNull: true/false [permitir campos nulos ou não]})
const Pergunta = connection.define("perguntas", {
  titulo: {
    // STRING - campo de texto limitado a 255 caracteres.
    type: sequelize.STRING,
    allowNull: false
  },
  descricao: {
    // TEXT - campo de texto com caracteres ilimitados.
    type: sequelize.TEXT,
    allowNull: false
  }
});

// .sync({force: boolean [se já tiver uma tabela com nome igual, permite ou não criar uma nova com o mesmo nome]}) - retorna uma Promise.
Pergunta.sync({force: false}).then(()=>{});

module.exports = Pergunta;