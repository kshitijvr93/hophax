var fs = require('fs');
var mysql = require('mysql')

var con = mysql.createConnection({
    host: "hophax.clgzlgbn10dv.us-east-1.rds.amazonaws.com",
    user: "rootuser",
    password: "rootpassword",
    database: "hophax"
  });

let wordlistFile = fs.readFileSync('wordlist')
let wordlist = wordlistFile.toString().match(/[^\r\n]+/g)

let file = fs.readFileSync('../recipes_raw/recipes_test.json');
let jsonObj = JSON.parse(file)

let counter = 0
let maxCount = 100

Object.keys(jsonObj).forEach(
    function(key){
        let recipe = jsonObj[key]
        let ingredients = recipe['ingredients']
        let ingrStr = ''
        ingredients.forEach(function(element){
            let parsedIngr = parseIngredient(element)
            if(parsedIngr.length > 0){
                ingrStr = ingrStr + parsedIngr + ';'
            }
        })
        //console.log(ingrStr)
        let sqlQuery = "INSERT INTO recipe(recipe_name,recipe,instructions,ingredients) VALUES ('" + recipe['title'].replace(/'/g, "''") + "','" + makeRecipe(recipe).replace(/'/g, "''") + "','" + recipe['instructions'].replace(/'/g, "''") + "','" + ingrStr.replace(/'/g, "''") + "')"
        if(counter++ < maxCount){
            con.query(sqlQuery, function (err, result) {
                if (err) throw err;
                console.log("adding a record: " + recipe['title'])
            });
        }
    }
)


function parseIngredient(line){
    let newLine = ''
    line.replace(/ *\([^)]*\) */g, ' ').replace(/,/g, '').split(' ').forEach(function(token){
        if(!(/\d/.test(token) || wordlist.includes(token))){
            newLine = newLine + token + ' '
        }
    })
    return newLine.trim()
}

function makeRecipe(recipe){
    let result = 'ingredients: \n'
    recipe['ingredients'].forEach(function(line){
        result = result + line + '\n'
    })
    result += recipe['instructions']
    return result
}