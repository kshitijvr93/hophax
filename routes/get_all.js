var express = require('express');
let val = require('./upload');
var con = val.con;
var router = express.Router();
var http = require("http");
var https = require("https");
// var twilio = require('twilio');
// var accountSid = 'AC7af586e321fa7f7456680ff33334685e'; // Your Account SID from www.twilio.com/console
// var authToken = 'e01a699246f453380eac63afa37a1667';   // Your Auth Token from www.twilio.com/console


// var client = new twilio(accountSid, authToken);




router.get("/", function(req, res) {

//   client.messages.create({
//     body: 'Hello from Node',
//     to: '+16093391767',  // Text this number
//     from: '+1' // From a valid Twilio number
// })
// .then((message) => console.log(message.sid));

    
    var response = [];
    var num = 50;
    con.query("SELECT * FROM recipe limit "+num, function (err, result) {
    if (err) throw err;
    
    result.forEach(function(element) {
    dict={ };
    dict["recipe_id"] = element.id;
    dict["recipe_name"]  = element.recipe_name;
    response.push(dict);
    
    });
    res.json(response);
  });

});
    



  module.exports = router;
