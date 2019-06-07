let api = require("../api/api");
let ejs = require('ejs');

/** **********************************************************************
 * Autor : Levêque Loris
 * Creation Date : 05.06.2019
 * Modification Date : 06.06.2019
 * 
 * Description :
 *      Route for page index
 *      Get data from db (Cards)
 * 
 * Errors :
 *      Error with the tags
 *          -> create another table if anoter tag is linked
 * 
 ********************************************************************** */

module.exports = {
    index: (request, response) => {
        //const SQL = "SELECT Card.idCard, carTitle, carContent, carDesc, carMetrique, creDate, useLogin, tagName, tagColor FROM Card INNER JOIN User ON Card.idUser=User.idUser INNER JOIN Tag ON Tag.idTag=Card.idCard";
        const SQL = "SELECT * FROM t_Card LEFT JOIN t_Tag ON t_Tag.fkCard=t_Card.idCard";
        //const SQL = "SELECT * FROM t_Tag";

        var database = new api;

        var connector = database.createConnector();

        database.executeSql(connector, SQL, (dataFromDB) => {
            var toDisplay;

            obj = {
                "cards": dataFromDB
            };

            ejs.renderFile("views/main.ejs", obj, (err, str) => {
                if (err) {
                    console.log("failed load index | err:" + err);
                    throw err;
                } else {
                    console.log("index loaded! ");
                    toDisplay = str;
                }
            });

            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(toDisplay);
            response.end();
        });
    }
}