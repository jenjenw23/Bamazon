var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
var Table = require('easy-table')


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "----",
  database: "bamazon_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  showProducts();
});

function showProducts() {

  connection.query("SELECT * FROM products", function (err, res) {
    //show list of items
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].Item_Id + " | " + res[i].Product_Name + " | " + res[i].Department_Name + " | " + res[i].Price + " | " + res[i].Stock_Quantity);
    // }
    // console.log("-----------------------------------");
    //shows cleaner list of items
    console.table(res);
    startShopping();
  });

  function startShopping() {
    inquirer
      .prompt([
        {
          name: "whatID",
          type: "input",
          message: "What is the ID of the product they would like to buy? ",
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
          message: "How many units of the product they would like to buy? ",
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
          console.log(answers.howManyUnits);
          console.log(res);
          
        });
    });
  }
}
