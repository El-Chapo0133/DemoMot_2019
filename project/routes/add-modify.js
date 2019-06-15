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
        var carTitle = request.body.title.replace(',', ' ');
        var carDesc = request.body.desc.replace(',', ' ');
        var carContent = request.body.content.replace(',', ' ');
        var carMetrique = request.body.metrique;

        console.log(carTitle);

        // carTitle, carDesc, carContent, carMetrique
        const SQL = "INSERT INTO t_Card (carTitle, carDesc, carContent, carMetrique, fkUser) VALUES ('" + carTitle + "', '" + carDesc + "', '" + carContent + "', " + carMetrique + ", 1)";
        //const SQL = "DELETE FROM t_User WHERE idUser = 3 OR idUser = 4 OR idUser = 5 OR idUser = 6";

        var database = new api;

        var connector = database.createConnector();

        database.executeSql(connector, SQL, (dataFromDB) => {
            //response.redirect('http://localhost:8081/index');
            //window.location.href = 'index';
            response.redirect('index');
        });
    }
}