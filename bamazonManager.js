var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "-----",
  database: "bamazon_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  whatToDo();
});

function whatToDo() {
  console.log("\n") //add space for easier reading
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Products for Sale":
          showProducts();
          break;

        case "View Low Inventory":
          showLowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addNewProduct();
          break;

        case "Exit":
          exitManager();
          break;
      }
    });
}

function showProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    //show list of items
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].Item_Id + " | " + res[i].Product_Name + " | " + res[i].Department_Name + " | " + res[i].Price + " | " + res[i].Stock_Quantity);
    // }
    //shows cleaner list of items
    console.log("\r\n");
    console.table(res);
    whatToDo();
  });
}

function showLowInventory() {
  connection.query('SELECT * FROM products WHERE `Stock_Quantity` < 5', function (err, res) {

    // throw error if occurs 
    if (err) throw err;
    console.log('\n' + "Low Stock Inventory" + '\n');
    console.table(res);
    whatToDo();
  })
}

function exitManager() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "wantToExit",
      message: "Are you sure you want to exit?"
    }])
    .then(function (response) {
      if (response.wantToExit) {
        console.log("\n*******");
        console.log("Goodbye!")
        console.log("********");
      } else {
        whatToDo();
      }
    });
}

function addNewProduct() {
  //clears choices to keep questions from repeating
  answers = [];
  inquirer.prompt([
    {
      name: "newProductName",
      type: "input",
      message: "What is the Product Name?",
      validate: function (value) {
        if (value === '') {
          console.log('\nPlease enter a valid department name.');
          return false;
        } else {
          return true;
        }
      }
    },
    {
      name: "newProductDept",
      type: "input",
      message: "What is the Department Name of the new product?",
      validate: function (value) {
        if (value === '') {
          console.log('\nPlease enter a valid department name.');
          return false;
        } else {
          return true;
        }
      }
    },
    {
      name: "newProductPrice",
      type: "input",
      message: "What is the Price of the new product?",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "newProductUnits",
      type: "input",
      message: "How much Stock is there of the new product?",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
    .then(function (answers) {

      //create vars and parse quantities 
      var newProductName = answers.newProductName;
      var newProductDept = answers.newProductDept;
      var newProductPrice = parseFloat(answers.newProductPrice).toFixed(2);
      var newProductUnits = parseInt(answers.newProductUnits);

      //update quantity
      connection.query("INSERT INTO products SET ?",
        [{
          Product_Name: newProductName,
          Department_Name: newProductDept,
          Price: newProductPrice,
          Stock_Quantity: newProductUnits
        }],
        function (err, response) {
          if (err) throw err;
          console.log("\n-------------------------");
          console.log("------New Item Added------");
          console.log("--------------------------");
          showProducts();
        })
    });
}

function addInventory() {
  //clears choices to keep questions from repeating
  inquirer.prompt([
    {
      name: "whatID",
      type: "input",
      message: "What is the ID of the product you would like add invetory to? ",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "howManyUnits",
      type: "input",
      message: "How many units of the product would you like to add? ",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
    .then(function (answers) {
      var query = 'SELECT Stock_Quantity, Price, Product_Name FROM products WHERE ?';
      connection.query(query, { Item_ID: answers.whatID },
        function (err, res) {
          //create vars and parse quantities to do the math correctly 
          var quantityStock = parseInt(res[0].Stock_Quantity);
          var quantityToAdd = parseInt(answers.howManyUnits);
          var newQuantity = quantityStock + quantityToAdd;
          console.log(newQuantity);

          //update quantity
          connection.query("UPDATE products SET ? WHERE ?",
            [{ Stock_Quantity: newQuantity }, { Item_ID: answers.whatID }],
            function (err, response) {
              if (err) throw err;
              console.log("\r\n----Stock Updated----");
              console.log("Quantity Remaining: " + newQuantity + "\n");
              showProducts();
            })
        });
    });
}

