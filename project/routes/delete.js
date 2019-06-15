let api = require('../api/api');
let mw_delTag = require('../middleWares/del_tags.mw');

module.exports = {
    delete: (request, response) => {
        console.log("[id]Card deleted :" + request.param("id"));
        var idToDel = request.param("id");
        const SQL = "DELETE FROM t_Card WHERE t_Card.idCard=" + idToDel
        var database = new api;

        var connector = database.createConnector();

        mw_delTag.delTagsByCard(idToDel);
        database.executeSql(connector, SQL, (dataFromDB) => {
            response.redirect('index');
        });
    }
}