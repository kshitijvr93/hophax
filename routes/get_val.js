var express = require('express');
let val = require('./upload');
var con = val.con;
var router = express.Router();




router.get("/:rec_name", function(req, res) {
  var response = {recipes:[]};
  con.query("SELECT * FROM recipe where recipe_name LIKE '%"+ req.params.rec_name+"%'", function (err, result) {
    console.log(result.length)
    if (err) throw err;
    result.forEach(function(element) {
      response['recipes'].push({
        id: element['id'],
        recipe_name: element['recipe_name'],
        recipe: element['recipe'],
        instructions: element['instructions'],
        ingredients: element['ingredients']
      })
    });
    console.log(response);
    res.json(response);
  });
});





module.exports = router;
