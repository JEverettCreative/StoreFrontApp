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
    displayAvailable();
});

function displayAvailable() {
    console.log("Showing all available products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        for(var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\n"
            + "Product Name: " + res[i].product_name + "\n"
            + "Price: " + res[i].price + "\n")
        }
        selectPurchase();
    });
}

function selectPurchase() {
    inquirer
        .prompt({
            name: "choice",
            type: "input",
            message: "Enter the Item ID number of the product you would like to order."
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units would you like to order? (Please enter the numeric value."

        }).then(function(answer) {
            
        })
}