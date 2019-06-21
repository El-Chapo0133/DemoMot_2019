/** Requires */
let api = require('../api/api')
let mw_delTag = require('../middleWares/del_tags.mw')
let loadInfoPage = require('../custom/loadInfoPage')


/** **********************************************************************
 * Autor : Levêque Loris
 * Creation Date : 05.06.2019
 * Modification Date : 21.06.2019
 * 
 * Description :
 *      Route for page delete
 *      Delete data from db (Cards and Tags)
 * 
 * Errors :
 *      no one already detected
 * 
 ********************************************************************** */

module.exports = {
    delete: (request, response) => {
        console.log("[id]Card deleted :" + request.param("id"))
        var idToDel = request.param("id")
        const SQL = "DELETE FROM t_Card WHERE t_Card.idCard=" + idToDel
        var database = new api

        var connector = database.createConnector()

        // delete all tags attached to the card (sql constraint)
        mw_delTag.delTagsByCard(idToDel, () => {
            // then delete card
            database.executeSql(connector, SQL, (dataFromDB) => {
                // load infoPage
                loadInfoPage.loadInfoPage("Réussite!", "Votre carte à bien été supprimée.", (str) => {
                    send(response, str)
                })
            })
        })
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