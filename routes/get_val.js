var express = require('express');
let val = require('./upload');
var con = val.con;
var router = express.Router();




router.get("/:rec_name", function(req, res) {

    
    var response = { };
    con.query("SELECT * FROM recipe where recipe_name ='"+ req.params.rec_name+"'", function (err, result) {
    if (err) throw err;
    
    result.forEach(function(element) {
    response = {
        recipe_name: element['recipe_name'] , recipe: element['recipe'], instructions: element['instructions'], ingredients: element['ingredients']
    }
    });
    res.json(response);
  });
    
  
  
    
    
  });





module.exports = router;
