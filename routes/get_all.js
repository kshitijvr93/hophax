var express = require('express');
let val = require('./upload');
var con = val.con;
var router = express.Router();
var http = require("http");
var https = require("https");
var twilio = require('twilio');
var accountSid = ''; // Your Account SID from www.twilio.com/console
var authToken = '';   // Your Auth Token from www.twilio.com/console


var client = new twilio(accountSid, authToken);




router.get("/", function(req, res) {

  client.messages.create({
    body: 'Hello from Node',
    to: '+1',  // Text this number
    from: '+1' // From a valid Twilio number
})
.then((message) => console.log(message.sid));

    
    var response = { };
    var num = 50;
    con.query("SELECT * FROM recipe limit "+num, function (err, result) {
    if (err) throw err;
    
    result.forEach(function(element) {
    response[element.recipe_name]  = {
      id: element.id 
    };
    
    });
    res.json(response);
  });

});
    



  module.exports = router;
