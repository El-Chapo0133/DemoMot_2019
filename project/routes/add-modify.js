let api = require('../api/api');
let ejs = require('ejs');

/** **********************************************************************
 * Autor : Levêque Loris
 * Creation Date : 05.06.2019
 * Modification Date : 06.06.2019
 * 
 * Description :
 *      Route for page add and modify
 *      Get data from db (Cards) if id in post data
 * 
 * Errors :
 *      
 * 
 ********************************************************************** */

module.exports = {
    modify: (request, response, idCard) => {
        const SQL = "SELECT idCard, carTitle, carContent, carDesc, carMetrique FROM Card WHERE idCard = '" + String(idCard) + "'";
        var database = new api;

        var connector = database.createConnector();

        var dataFromDB = database.executeSql(connector, SQL);

        obj = {
            "card": dataFromDB
        }

        var toDisplay = ejs.renderFile('views/add-modify.ejs', obj, (err, str) => {
            if (err) {
                console.log("failed load add-modify.ejs");
                throw err;
            } else {
                console.log("add-modify loaded");
                return str;
            }
        });

        response.WriteHead(200, {"Content-Type": "text/html"});
        response.write(toDisplay);
        response.end();
    },
    add: (request, response) => {
        var toDisplay

        obj = {
            "card": undefined
        }

        ejs.renderFile("views/add-modify.ejs", obj, (err, str) => {
            if (err) {
                console.log("failed load add-modify.ejs");
                throw err;
            } else {
                console.log("add-modify loaded");
                toDisplay = str;
            }
        });

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(toDisplay);
        response.end();
    }
}