let mysql = require("mysql");
let inquirer = require("inquirer");
const util = require("util");

let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "inventoryDB"
});


async function promptUser() {
    return await inquirer.prompt([
      {
        type: "input",
        name: "item",
        message: "What is the item you wish to update?"
      },
      {
        type: "input",
        name: "quantity",
        message: `Did you sell ${this.item} `
      },
      {
        type: "input",
        name: "quantityChange",
        message: `How mant ${this.item} items are added or sold?`
      },
      {
        type: "input",
        name: "price",
        message: "What is the price of the item?"
      },
      {
        type: "input",
        name: "delete",
        message: "Do you wish to delete an item? yes or no."
      },
      {
        type: "input",
        name: "deleteItem",
        message: "Which item do you want to delete?"
      },
    ]);
  }
  
const answers = promptUser();

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProduct();
});


function readProduct() {
    console.log("Current Inventory...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      createProduct();
    });
  }
  

function createProduct() {
  console.log("Inserting a new product...\n");
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      item: answers.item,
      price: answers.price,
      quantity: answers.quantity
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      updateProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function updateProduct() {
  console.log("Updating quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        quantity: answers.quantity
      },
      {
        item: answers.item
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteProduct() {
    if(answers.delete == "yes") {
  console.log(`We stopped carrying ${answers[0]}! Deleting from inventory...\n`);
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      item: answers.deleteItem
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      readProducts2();
    }
  );
}
}

function readProducts2() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}
