let api = require('../api/api');
let mw_insertTag = require('../middleWares/insertTags.mw')
let redirect_index = require('../custom/loadInfoPage')

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
        var isGood = true;
        var carTitle = request.body.title.replace(',', ' ');
        var carDesc = request.body.desc.replace(',', ' ');
        var carContent = request.body.content.replace(',', ' ');
        var carMetrique
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
        if (!carTitle || !carDesc || !carContent) {
            isGood = false
        }
        //console.log(request.body.json_tags)
        // no tag
        if (request.body.json_tags == "") {
            tags = JSON.parse('{ "dataset": [] }')
        } else {
            tags = JSON.parse(request.body.json_tags)
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

        if (isGood) {
            const SQL = "INSERT INTO t_Card (carTitle, carDesc, carContent, carMetrique, fkUser) VALUES ('" + carTitle + "', '" + carDesc + "', '" + carContent + "', " + carMetrique + ", 1)";

            var database = new api;

            var connector = database.createConnector()

            database.executeSql(connector, SQL, (dataFromDB) => {
                mw_insertTag.insertTags(tags, dataFromDB.insertId, () => {
                    //response.redirect('http://localhost:8081/index');
                    //window.location.href = 'index';
                    //response.redirect('index');
                    redirect_index.loadInfoPage('Réussite!', "Votre carte à bien été ajoutée", (str) => {
                        send(response, str);
                    })
                })
            });
        } else {
            redirect_index.loadInfoPage('Erreur!', "Une erreur à été détectée (champ vide ou non-valide).", (str) => {
                send(response, str);
            })
        }
    }
}

function send(response, str) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(str);
    response.end();
}
