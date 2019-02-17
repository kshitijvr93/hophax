var express = require('express');
let val = require('./upload');
var con = val.con;
var router = express.Router();
var http = require("http");
var https = require("https");


  

router.get("/:rec_name", function(req, res) {

    let pricevalue = 0;
    var response = { };
    con.query("SELECT * FROM recipe where recipe_name LIKE '%"+ req.params.rec_name+"%'", function (err, result) {
    if (err) throw err;
    if(result.length == 0){
      res.send();
    }
    element = result[0];
    
    response = {
        recipe_name: element.recipe_name , recipe: element.recipe, instructions: element.instructions, ingredients: element.ingredients
    }

    
    var element_list = element.ingredients.split(';');
    
    let numOfReq = element_list.length;
    let counter = 0;

    element_list.forEach(function(vals){
      
      var url = 'http://search.mobile.walmart.com/search?query='
      url = url + encodeURI(vals)+'&store=2045'
      url = encodeURI(url);
      console.log(url);



      http.get(url, (resp) => {
        let data = '';
  
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          
          data += chunk;
         });
  
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          data = JSON.parse(data);
          if(data!=null && data!=undefined ){
            if(data['results']!=null && data['results']!=undefined){
              if(data['results'][0]!=null && data['results'][0]!=undefined ){
           
                pricevalue += data['results'][0]['price']['priceInCents'];       
              }
            }
            
  
          }
          counter++;
          if(counter == numOfReq){
            console.log(pricevalue);
            pricevalue = pricevalue/100;
            res.send("$"+pricevalue.toString());
          }
          
        
      });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

});

 
    });
    
  
   
  });

  
    
    
  





module.exports = router;
