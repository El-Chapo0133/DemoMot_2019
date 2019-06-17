let api     = require('../api/api')
let ejs     = require('ejs')
let json_mw = require('../middleWares/json_tag.mw');

module.exports = {
    modify: (request, response) => {
        var idToModify = request.param("id")
        const SQL = "SELECT idCard, carTitle, carContent, carDesc, carMetrique FROM t_Card WHERE idCard = " + String(idToModify);
        var database = new api;

        var connector = database.createConnector();

        database.executeSql(connector, SQL, (dataFromDB) => {
            // reconstruct json
            var dataReconstructed = json_mw.createJsonTag(dataFromDB);

            obj = {
                "card": dataReconstructed,
                "pageTitle": "Modification"
            }
    
            ejs.renderFile('views/modify.ejs', obj, (err, str) => {
                if (err) {
                    console.log("failed load modify.ejs");
                    throw err;
                } else {
                    console.log("modify loaded")
                    send(response, str);
                }
            });
        });
    },
    modifySecond: (request, reponse) => {
        console.log("made!")
    }
}

function send(response, str) {
    //WriteHead(200, { "Content-Type": "text/html" });
    response.write(str);
    response.end();
}
