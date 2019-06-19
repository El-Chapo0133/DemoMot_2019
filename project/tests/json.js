// Consts
const PORT = 8081;
let mw_color = require('../middleWares/color_tag.mw')
let express = require('express')

var app = express()

// Local Server
app.get('/', (request, response) => {
    /** ######################################################## */

    var json = JSON.parse('{"dataset": [{"name": "test"}, {"name": "test2"}]}')

    console.log(json)

    json.dataset[0].name = "wwww"

    console.log(json)

    /** ######################################################## */
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end();
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("ouch! " + err);
        throw err;
    } else {
        console.log("server lunched on port :" + PORT);
    }
});