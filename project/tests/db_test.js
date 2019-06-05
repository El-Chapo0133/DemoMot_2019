// Consts
const PORT = 8081;

// Requires
let express = require('express');
let ejs = require('ejs');
let body_parser = require('body-parser');
let mysql = require('mysql');

// Variables
var app = express();

app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json()); // parse form data client

// accessibility to ressources files
app.use(express.static(__dirname + '/ressources/'));
app.use(express.static(__dirname + '/views/'));

const db = mysql.createConnection({
    host: 'localhost',
    database: 'demomotdb',
    user: 'demomotuser',
    password: 'jL6H922e7u2zt3sMDHKa'
});
db.connect();
global.db = db;

// Local Server
app.get('/', (request, response) => {
    /** ######################################################## */

    db.query("SELECT * FROM User", (err, result) => {
        if (err) {
            throw err;
        } else {
            response.renderFile('main.ejs', {
                cards: result
            }, (err, str) => {
                if (err) {throw err;}
                response.write(str);
            });
        }
    });

    /** ######################################################## */
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end();
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("ouch! " + err);
        throw err;
    } else {
        console.log("server lunched on port :" + PORT);
    }
});