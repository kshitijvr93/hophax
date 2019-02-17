var express = require('express');
let val = require('./upload');
var con = val.con;
var router = express.Router();
var http = require("http");
var https = require("https");



router.get("/", function(req, res) {

    
    var response = { };
    var num = 50;
    con.query("SELECT * FROM recipe limit "+num, function (err, result) {
    if (err) throw err;
    
    result.forEach(function(element) {
    response[element.id]  = {
      recipe_name: element.recipe_name , recipe: element.recipe, instructions: element.instructions, ingredients: element.ingredients
    };
    
    });
    res.json(response);
  });

});
    



  module.exports = router;
