var fs = require('fs');

let file = fs.readFileSync('../recipes_raw/recipes_raw_nosource_ar.json');
let jsonObj = JSON.parse(file)
//console.log(Object.keys(jsonObj).length)
Object.keys(jsonObj).forEach(
    function(key){
        let recipe = jsonObj[key]
        
    }
)