// npm i sequelize mysql2 - para Sequelize funcionar tive que instalar ele e o MySQL2

const sequelize = require("sequelize");

// Conectar ao BD deve-se colocar: new sequelize("nome do bd", "nome do usuario", "senha do bd", {host: "host", dialect: "qual é o tipo de bd que quero me conectar no sequelize"})
const connection = new sequelize("guiaperguntas", "root", "WesleySToS1996*!?+(/", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = connection;