let api         = require('../api/api')
let ejs         = require('ejs')
let json_mw     = require('../middleWares/json_tag.mw');
let insert_tags = require('../middleWares/insertTags.mw')
let del_tag     = require('../middleWares/del_tags.mw')
let color_tag   = require('../middleWares/color_tag.mw')
let loadInfoPage = require('../custom/loadInfoPage')

/** **********************************************************************
 * Autor : Levêque Loris
 * Creation Date : 05.06.2019
 * Modification Date : 06.06.2019
 * 
 * Description :
 *      Route for page modify and modify-second
 *      Uptade data from db (Cards and Tags)
 * 
 * Errors :
 *      no one has been detected
 * 
 ********************************************************************** */

module.exports = {
    modify: (request, response) => {
        var idToModify = request.param("id")
        const SQL = "SELECT idCard, carTitle, carContent, carDesc, carMetrique, GROUP_CONCAT(tagName SEPARATOR ';') AS tagName, GROUP_CONCAT(tagColor SEPARATOR ';') AS tagColor FROM t_Card LEFT JOIN t_Tag ON t_Tag.fkCard=t_Card.idCard WHERE idCard = " + String(idToModify);
        var database = new api;

        var connector = database.createConnector();

        database.executeSql(connector, SQL, (dataFromDB) => {
            // reconstruct json
            var dataReconstructed = json_mw.createJsonTag(dataFromDB);

            var tags_front = '{ "dataset": [\n'
            var count = 0
            dataReconstructed.dataset[0].tags.forEach((tag) => {
                if (tag.tagName != null) {
                    tags_front += '{ "idTag": ' + count++ + ', "tagName": "' + tag.tagName + '", "tagColor": "' + tag.tagColor + '", "idCard": ' + request.param("id") + '},'
                }
            })
            if (tags_front[tags_front.length - 1] != '[') {
                tags_front = tags_front.substring(0, tags_front.length - 1)
            }
            tags_front += ']}'

            obj = {
                "card": dataReconstructed,
                "pageTitle": "Modification",
                "initialTags": tags_front,
                "idCard": request.param("id")
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
    modifySecond: (request, response) => {
        // get
        var idCard = request.param('id')
        // post
        var carTitle, carDesc, carContent, carMetrique
        var tags
        // variables
        var isGood = true;
        var database = new api
        var connector = database.createConnector()

        carTitle = request.body.title.replace(',', ' ');
        carDesc = request.body.desc.replace(',', ' ');
        carContent = request.body.content.replace(',', ' ');
        if (!isNaN(parseInt(request.body.metrique, 10))) {
            // id input number
            carMetrique = parseInt(request.body.metrique)
        } else if (request.body.metrique > 255) {
            // if input > 255
            carMetrique = 255
        } else if (request.body.metrique < 1) {
            // if input < 1
            carMetrique = 1
        } else {
            carMetrique = 255
        }
        // check if some input(s) are empty
        if (!carTitle || !carDesc || !carContent || carTitle == "" || carDesc == "" || carContent == "") {
            isGood = false
        }
        // check if input has only unaccepted char
        var checkChar = false
        // for title
        if (carTitle) {
            for (var i = 0; i < carTitle.length; i++) {
                if (carTitle[i] != " " || carTitle[i] == "'" || carTitle[i] == "," || carTitle[i] == '"') {
                    checkChar = true
                }
            }
            if (checkChar === false) {
                isGood = false
            }
        }
        checkChar = false
        // for description
        if (carDesc) {
            for (var i = 0; i < carDesc.length; i++) {
                if (carDesc[i] != " " || carDesc[i] == "'" || carDesc[i] == "," || carDesc[i] == '"') {
                    checkChar = true
                }
            }
            if (checkChar === false) {
                isGood = false
            }
        }
        checkChar = false
        // for content
        if (carContent) {
            for (var i = 0; i < carContent.length; i++) {
                if (carContent[i] != " " || carContent[i] == "'" || carContent[i] == "," || carContent[i] == '"') {
                    checkChar = true
                }
            }
            if (checkChar === false) {
                isGood = false
            }
        }
        // check if json of tag is empty and set json -> for to be accepted
        // if json tag is empty, will create a dataset array empty -> no tag created
        if (request.body.jsonTags === "") {
            tags = JSON.parse('{ "dataset": [] }')
        } else {
            tags = JSON.parse(request.body.jsonTags)
        }
        console.log(tags)

        // check if color is on right syntax -> [red].[green].[blue]
        tags.dataset.forEach((tag) => {
            // isn't ok
            if (tag.tagColor.split('.').length < 3) {
                tag.tagColor = color_tag.getColor10(tag.tagColor)
            } else {
                /** do nothing */
            }
        })

        // if all is ok
        if (isGood == true) {
            // delete all tags linked with the card -> OK
            del_tag.delTagsByCard(idCard, () => {
                console.log("[mw] deleted all tags with the cardId:" + idCard)
            })
            // then update card -> OK
            const SQL = "UPDATE t_Card SET carTitle = '" + carTitle + "', carDesc = '" + carDesc + "', carContent = '" + carContent + "', carMetrique = " + carMetrique + " WHERE t_Card.idCard=" + idCard

            database.executeSql(connector, SQL, (result) => {
                // then insert all tag ->
                insert_tags.insertTags(tags, idCard, () => {
                    loadInfoPage.loadInfoPage("Réussite!", "Votre carte a bien été mise à jour.", (str) => {
                        send(response, str)
                    })
                })
            })
        } else {
            // is error
            loadInfoPage.loadInfoPage("Erreur!", "Une erreur à été détectée (champ vide ou non-valide).", (str) => {
                send(response, str)
            })
        }
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
    response.write(str);
    response.end();
}