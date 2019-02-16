var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var bodyParser = require("body-parser");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hophax"
});


// Body Parser Middleware

router.use(bodyParser.json());

router.post("/", function(req, res) {

  var sql = "INSERT INTO recipe(recipe_name,recipe,instructions,ingredients) VALUES ('"+req.body.recipe_name+"','"+req.body.recipe+"','"+ req.body.instructions+"','"+ req.body.ingredients+"' )";
  con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("1 record inserted");
  });
  
  
});






module.exports = router;
module.exports.con = con;