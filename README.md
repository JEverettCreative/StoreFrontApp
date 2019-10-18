## StoreFrontApp (Bamazon)
Bamazon is a CLI-based app using Node.js and MySQL to generate an imitation of an online ordering storefront.

## Contributors
@JEverettCreative

## Technology
* Node.js, MySQL, SQL Workbench. 

## About
Bamazon has two main apps with different purposes. BamazonCustomer.js simply allows a user to view all the products available in the MySQL database table "products." They then can enter the item number of whatever they would like to purchase and how many, then the app will check the database stock_quantity. If enough quantity exists, it will calculate the total cost, subtract from the database, and then allow the user to choose to either go back to the beginning or exit.

BamazonManager.js, currently still a work-in-progress, aims to imitate the viewpoint of a manager checking the inventory through the database. They can currently view all items or filter to items where stock_quantity has fallen to less than 5 items. In each instance, they can return to the first options or quit. Future functionality, when completed, will allow the user as manager to replenish stock_quantities and add entirely new products.

## How-to use this code
* Files could be pulled and run through GitBash once installed on your machine. Screenshot examples are further below on this Readme.

## Contributing Guidelines
Suggestions are welcome!

## Contact
#### Developer/Full-stack Web Software Developer
* e-mail: jonathan@jonathaneverettcreative.com
* LinkedIn: https://www.linkedin.com/in/jonathan-everett-64725435/

## Screenshot Use Examples BamazonCustomer:
* Open the Customer application by running your CLI and running "node bamazonCustomer"; shows all products initially
![CustomerOpenApp](https://user-images.githubusercontent.com/45632983/56180842-aa821980-5fd0-11e9-94de-0f5b5fc04a38.png)

* Follow the prompts to order. Choosing an item in a quantity that exceeds stock will result in the following:
![Insufficient](https://user-images.githubusercontent.com/45632983/56180954-1d8b9000-5fd1-11e9-9b8c-8d97b2db0eec.png)

* Choosing "Buy Again" allows you to start over. An order that can be fulfilled will be received in the following manner:
![OrderSuccess](https://user-images.githubusercontent.com/45632983/56181028-65121c00-5fd1-11e9-8603-d9e6c473048d.png)

## Screenshot Use Examples BamazonManager (thus far):
* Open the Customer application by running your CLI and running "node bamazonManager"; The following menu opens up:
![ManagerOpenApp](https://user-images.githubusercontent.com/45632983/56181109-be7a4b00-5fd1-11e9-82fd-8c3c595e92ea.png)

* View Products for Sale displays all products, prices, and quantities with an ID number:
![ManagerShowAll](https://user-images.githubusercontent.com/45632983/56181176-000af600-5fd2-11e9-9b4e-c8b54f5eaed9.png)

* Choosing Options Menu allows you to return to the beginning and now choose Low Inventory, displaying all products under 5 stock:
![LowInventory](https://user-images.githubusercontent.com/45632983/56181245-3e081a00-5fd2-11e9-80ed-11b2fe1959e0.png)
