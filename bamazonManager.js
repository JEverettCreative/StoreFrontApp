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

function viewProducts() {
    console.log("Showing all products currently for sale...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        for(var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\n"
            + "Product Name: " + res[i].product_name + "\n"
            + "Price: " + res[i].price + "\n"
            + "Stock Quantity: " + res[i].stock_quantity + "\n");
        }
        continueWorking();
    });
}

function continueWorking() {
    inquirer
        .prompt({
            name: "optionsMenu",
            type: "list",
            message: "Would you like to return to the options menu and keep working?",
            choices: [
                "Options Menu",
                "I'm Done, Thanks"
            ]
        }).then(function(answer) {
            if(answer.optionsMenu === "Options Menu") {
                displayOptions();
            } else {
                console.log("\nGood work today! See you next time.");
                connection.end();
            }
        });
}

function viewInventory() {
    console.log("Showing all products running low on inventory...\n");

    var query = "SELECT * FROM products WHERE stock_quantity <= 5";
    connection.query(query, function(err, res) {
        if (err) throw err;
        if (res.length > 0) {
            for(var i = 0; i < res.length; i++) {
                console.log("Item ID: " + res[i].item_id + "\n"
                + "Product Name: " + res[i].product_name + "\n"
                + "Price: " + res[i].price + "\n"
                + "Stock Quantity: " + res[i].stock_quantity + "\n");
            }
            continueWorking();
        } else {
            console.log("All products currently have sufficient stock quantity.");
            continueWorking();
        }
    });
}

function addInventoryStock() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\n"
            + "Product Name: " + res[i].product_name + "\n"
            + "Stock Quantity: " + res[i].stock_quantity + "\n");
        }
        inquirer
        .prompt({
            name: "products",
            type: "input",
            message: "What enter the Item ID of the product you would like to add stock to from the list above."
        }).then(function(answer){
            console.log(answer.product_name);
        });
    })
}