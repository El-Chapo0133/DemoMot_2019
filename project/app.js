// Consts
const PORT = 8081;

// Requires
let express = require('express');
let ejs = require('ejs');

// Variables
var app = express();

// accessibility to css files
app.use(express.static(__dirname + '/ressources/'));

// Local Server
app.get('/', (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    // variable to display (html string)
    var data;
    // ejs render
    ejs.renderFile("views/main.ejs", (err, str) => {
        if (err) {
            console.log("ouch! " + err);
        } else {
            data = str;
        }
    });
    response.write(data);
    response.end();
}).listen(PORT, (err) => {
    if (err) {
        console.log("ouch! " + err);
    } else {
        console.log("server lunched on port :" + PORT);
    }
});