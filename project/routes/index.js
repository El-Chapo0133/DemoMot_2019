let api = require("../api/api");

module.exports = {
    index: (request, response) => {
        var database = new api;

        var connector = database.createConnector();
        
        var data = database.executeSql(connector, "SELECT * FROM User");
    }
}