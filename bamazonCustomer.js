var login = require("./login");

var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: login.password,
    database: "products"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id: " + connection.threadId + "\n");

});