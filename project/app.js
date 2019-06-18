// ################################# Consts #################################
const PORT = 8081

// ################################# Requires #################################
let express = require('express')
let body_parser = require('body-parser')
var router = require('./routes/root')


/** **********************************************************************
 * Autor : Levêque Loris
 * Creation Date : 05.06.2019
 * Modification Date : 06.06.2019
 * 
 * Description :
 *      Main page
 *      Will create and start the local server
 *      Use router for routing page
 * 
 * Errors :
 *      
 * 
 ********************************************************************** */

// ################################# Variables #################################
var app = express()

/** Application settings */
app.set('view engine', 'ejs')
app.use(body_parser.urlencoded({ extended: true }))
app.use(body_parser.json()); // parse form data client

// Accessibility to ressources files
app.use(express.static(__dirname + '/resources/css'))
app.use(express.static(__dirname + '/resources/js'))
app.use(express.static(__dirname + '/views/'))
app.use(express.static(__dirname + '/middleWares/'))
app.use(express.static(__dirname + '/api/'))
app.use(express.static(__dirname + '/library/'))

/** ################################ Local Server ################################## */
/** Router for routing page @return {none} */
app.use(router);
/** Start the local server */
app.listen(PORT, (err) => {
    if (err) {
        console.log("ouch! " + err)
        throw err;
    } else {
        console.log("server lunched on port :" + PORT)
    }
});
/** ################################################################## */