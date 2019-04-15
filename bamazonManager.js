var login = require("./login");

var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: login.password,
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id: " + connection.threadId + "\n");
    displayOptions();
});

function displayOptions() {
    inquirer
        .prompt(
            {
            name: "action",
            type: "rawlist",
            message: "What action would you like to take now?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }).then(function(answer) {
            switch (answer.action) {
                case "View Products for Sale":
                viewProducts();
                break;

                case "View Low Inventory":
                viewInventory();
                break;

                case "Add to Inventory":
                addInventoryStock();
                break;

                case "Add New Product":
                addProduct();
                break;
            }
        });
}

