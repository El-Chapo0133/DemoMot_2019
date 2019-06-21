let api = require("../api/api");
let ejs = require('ejs');
let json_mw = require('../middleWares/json_tag.mw');
let body_parser = require('body-parser');
let orderTag = require('../middleWares/order_tag.mw')
let getColor = require('../middleWares/color_tag.mw')

/** **********************************************************************
 * Autor : Levêque Loris
 * Creation Date : 05.06.2019
 * Modification Date : 21.06.2019
 * 
 * Description :
 *      Route for page index
 *      Get data from db (Cards)
 * 
 * Errors :
 *      no one already detected
 * 
 ********************************************************************** */

module.exports = {
    index: (request, response) => {
        var pageTitle = "Accueil"

        var SQL = "SELECT idCard, carTitle, carDesc, carContent, carMetrique, GROUP_CONCAT(DISTINCT tagName ORDER BY tagName SEPARATOR ';') AS tagName, GROUP_CONCAT(tagColor SEPARATOR ';') AS tagColor FROM t_Card LEFT JOIN t_Tag ON t_Tag.fkCard=t_Card.idCard GROUP BY t_Card.idCard"

        // ORDER BY t_Card.carMetrique ASC
        if (global.cookies.order === "asc") {
            // order by asc metrique
            SQL += " ORDER BY t_Card.carMetrique ASC"
        } else if (global.cookies.order === "desc") {
            // order by desc metrique
            SQL += " ORDER BY t_Card.carMetrique DESC"
        } else {
            // other order -> order by id (date)
            SQL += " ORDER BY t_Card.idCard ASC"
        }

        var database = new api

        var connector = database.createConnector()

        database.executeSql(connector, SQL, (dataFromDB) => {
            // reconstruct json
            var dataReconstructed = json_mw.createJsonTag(dataFromDB)

            // object to send into the view
            obj = {
                "cards": dataReconstructed,
                "pageTitle": pageTitle,
                "goToAcceuil" : false,
                "order": global.cookies.order
            };

            if (request.param("search") != "" && request.param("search") != undefined) {
                obj.cards = orderTag.orderTag(dataReconstructed, request.param('search'))
                obj.pageTitle = "Recherche : " + request.param("search")
                obj.goToAcceuil = true
            } else {
                /** do nothing */
            }

            /** give a pause -> like a callback for when obj.dataset[obj.cards.dataset.length - 1].tags is defined
             * for resolving bug for tags color
             */
            console.log("# callback for genering good color to tag [callback input]:console.log")
            if (obj.cards.dataset.length == 0) {
                console.log(obj.cards.dataset)
            } else {
                console.log(obj.cards.dataset[obj.cards.dataset.length - 1])
            }
            console.log("# end callback")

            // generate html with ejs library
            // @callback {when file is loaded}
            ejs.renderFile("views/main.ejs", obj, (err, str) => {
                if (err) {
                    console.log("failed load index | err:" + err);
                    throw err;
                } else {
                    console.log("index loaded! ");
                    // send html
                    send(response, str);
                }
            });
        });
    }
}

/**
 * Will send a string html to client
 * @param {response} response 
 * @param {string} str
 * @return {none}
 * @callback {none} 
 */
function send(response, str) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(str);
    response.end();
}
