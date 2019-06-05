// ################################# Consts #################################
const PORT = 8081;

// ################################# Requires #################################
let express = require('express');
let body_parser = require('body-parser');


// ################################# Variables #################################
var app = express();

app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json()); // parse form data client

// accessibility to ressources files
app.use(express.static(__dirname + '/ressources/'));
app.use(express.static(__dirname + '/views/'));

/** ################################################################## */
// Local Server
app.get('/', (request, response) => {

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end();
}).listen(PORT, (err) => {
    if (err) {
        console.log("ouch! " + err);
        throw err;
    } else {
        console.log("server lunched on port :" + PORT);
    }
});
/** ################################################################## */