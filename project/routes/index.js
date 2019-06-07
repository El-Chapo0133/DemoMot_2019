let api = require("../api/api");
let ejs = require('ejs');

module.exports = {
    index: (request, response) => {
        const SQL = "SELECT idCard, carTitle, carContent, carDesc, carMetrique FROM Card";
        var database = new api;

        var connector = database.createConnector();
        
        var dataFromDB = database.executeSql(connector, SQL);

        obj = {
            "cards": dataFromDB
        };

        var toDisplay = ejs.renderFile("../views/main.ejs", ebj, (err, str) => {
            if (err) {
                console.log("failed load index | err:" + err);
                throw err;
            } else {
                console.log("index loaded!");
                return str;
            }
        });

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(toDisplay);
        response.end();
    }
}