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
    add: (request, response) => {
        var carTitle = request.body.title.replace(',', ' ');
        var carDesc = request.body.desc.replace(',', ' ');
        var carContent = request.body.content.replace(',', ' ');
        var carMetrique
        if (typeof(request.body.metrique) === typeof(1)) {
            carMetrique = request.body.metrique;
        } else if (request.body.metrique > 255) {
            carMetrique = 255
        } else if (request.body.metrique < 1) {
            carMetrique = 1
        } else {
            carMetrique = 255
        }

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