const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

connection.connect((error) => {
  if (error) {
    console.log("error al conectarse a la base de datos", error);
  }
  console.log("conexion de la base de datos establecida");

});

module.exports = connection;
