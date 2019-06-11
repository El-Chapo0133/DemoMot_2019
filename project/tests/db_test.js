// Consts
const PORT = 8081;

// Requires
let express = require('express');
let ejs = require('ejs');
let body_parser = require('body-parser');
let mysql = require('mysql');
let middleWare = require('../mw_json/json_tag.mw');

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

    db.query("SELECT idCard, carTitle, carDesc, carContent, GROUP_CONCAT(tagName SEPARATOR ';') AS tagName, GROUP_CONCAT(tagColor SEPARATOR ';') AS tagColor FROM t_Card LEFT JOIN t_Tag ON t_Tag.fkCard=t_Card.idCard GROUP BY t_Card.idCard", (err, result) => {
        if (err) {
            throw err;
        } else {
            //console.log(result);
            var lastJson = middleWare.createJsonTag(result);

            console.log(lastJson);
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