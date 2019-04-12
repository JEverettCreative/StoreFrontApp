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
        .prompt([{
            name: "choice",
            type: "input",
            message: "Enter the Item ID number of the product you would like to order."
        },
        {
            name: "number",
            type: "input",
            message: "How many units would you like to order? (Please enter the numeric value.)"

         }]).then(function(answer) {
            var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
            connection.query(query, {item_id: answer.choice}, function(err, res) {
                if (err) throw err;
                if (answer.number > res[0].stock_quantity) {
                    console.log("\nInsufficent quantity! Order cannot be fulfilled at this time.");
                    console.log("Please try again later to see if we've restocked. Thanks!\n");
                    buyMore();
                } else {
                console.log("Order received! Calculating total...\n");
                var total = res[0].price * answer.number;
                console.log("Your Total is: " + total);
                // updateStock();
                var newQuery = "UPDATE products SET ? WHERE ?";
                connection.query(newQuery, [
                    {
                        stock_quantity: res[0].stock_quantity - answer.number
                    },
                    {
                        item_id: answer.choice
                    }
                ], function(err, res) {
                    if (err) throw err;
                    console.log("\n" + answer.number + " item sent to shipping.\n");
                    buyMore();
                });
                            }
                        });
                    });
}

function buyMore() {
    inquirer
        .prompt({
            name: "buyAgain",
            type: "list",
            message: "Would you like to buy anything else?",
            choices: [
                "Buy Again",
                "I'm Done, Thanks"
            ]
        }).then(function(answer) {
            if(answer.buyAgain === "Buy Again") {
                displayAvailable();
            } else {
                console.log("\nThanks for shopping with us -- See ya next time!");
                connection.end();
            }
        });
}