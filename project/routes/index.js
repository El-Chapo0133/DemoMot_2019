let api = require("../api/api");
let ejs = require('ejs');
let json_mw = require('../middleWares/json_tag.mw');

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
        const SQL = "SELECT idCard, carTitle, carDesc, carContent, carMetrique, GROUP_CONCAT(tagName SEPARATOR ';') AS tagName, GROUP_CONCAT(tagColor SEPARATOR ';') AS tagColor FROM t_Card LEFT JOIN t_Tag ON t_Tag.fkCard=t_Card.idCard GROUP BY t_Card.idCard";

        var database = new api;

        var connector = database.createConnector();

        database.executeSql(connector, SQL, (dataFromDB) => {
            var toDisplay;

            // reconstruct json
            var dataReconstructed = json_mw.createJsonTag(dataFromDB);
            // object to send into the view
            obj = {
                "cards": dataReconstructed
            };
            // generate html with ejs library
            // @callback {when file is loaded}
            ejs.renderFile("views/main.ejs", obj, (err, str) => {
                if (err) {
                    console.log("failed load index | err:" + err);
                    throw err;
                } else {
                    console.log("index loaded! ");
                    toDisplay = str;
                }
            });
            // send html
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(toDisplay);
            response.end();
        });
    }
}