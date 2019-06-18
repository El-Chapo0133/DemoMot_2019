let api         = require('../api/api')
let ejs         = require('ejs')
let json_mw     = require('../middleWares/json_tag.mw');
let insert_tags = require('../middleWares/insertTags.mw')
let loadInfoPage = require('../custom/loadInfoPage')

module.exports = {
    modify: (request, response) => {
        var idToModify = request.param("id")
        const SQL = "SELECT idCard, carTitle, carContent, carDesc, carMetrique, GROUP_CONCAT(tagName SEPARATOR ';') AS tagName, GROUP_CONCAT(tagColor SEPARATOR ';') AS tagColor FROM t_Card LEFT JOIN t_Tag ON t_Tag.fkCard=t_Card.idCard WHERE idCard = " + String(idToModify);
        var database = new api;

        var connector = database.createConnector();

        database.executeSql(connector, SQL, (dataFromDB) => {
            // reconstruct json
            var dataReconstructed = json_mw.createJsonTag(dataFromDB);

            console.log(dataReconstructed.dataset[0].tags.length)

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
        var tags = JSON.parse(request.body.jsonTags)
        insert_tags.insertTags(tags.dataset)


        /** loadInfoPage.loadInfoPage("", "", (str) => {
                send(response, str)
            })
        */
    }
}

function send(response, str) {
    //WriteHead(200, { "Content-Type": "text/html" });
    response.write(str);
    response.end();
}
