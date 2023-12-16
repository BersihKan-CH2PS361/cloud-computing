const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "34.101.86.165",
    user: "root",
    database: "api_backend",
    password: "password",
})

connection.connect();
module.exports = connection;