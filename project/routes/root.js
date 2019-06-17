let express = require('express');
let routeIndex = require('./index');
let routeAddModify = require('./add-modify');
let routeDelete = require('./delete');

// routeur variable
let router = express.Router();

/** **********************************************************************
 * Autor : Levêque Loris
 * Creation Date : 05.06.2019
 * Modification Date : 06.06.2019
 * 
 * Description :
 *      Router for the application
 *      Will redirect on the page wanted
 *      Routes will do their jobs (data, return html, etc..)
 * 
 * Errors :
 *      Error with the tags
 *          -> create another table if anoter tag is linked
 * 
 ********************************************************************** */

 /** ***
  * Simply like a constructor
  * @param {none}
  * @return {none}
  * @callback {none}
  * ******/
router.use((request, response, next) => {
    console.log('####################################################');
    console.log('Time :' + Date.now());
    console.log('url :' + request.url);
    next();
});

/** ############################ Routes ############################ */
/** ***
 * Redirect into the page index
 * @param {none}
 * @return {none}
 * @callback {none}
 */
router.get('/', (request, response) => {
  console.log("route [router]: /  -> redirect to {index}");
  response.redirect('index');
});
 /** ***
  * Page index
  * @param {none}
  * @return {none}
  * @callback {none}
  * ******/
router.get('/index', (request, response) => {
    console.log("route [router]: index");
    routeIndex.index(request, response);
});

 /** ***
  * Page add
  * @param {none}
  * @return {none}
  * @callback {none}
  * ******/
router.post('/add', (request, response) => {
    console.log("route [router]: add");
    routeAddModify.add(request, response);
});


 /** ***
  * Page modify
  * @param {none}
  * @return {none}
  * @callback {none}
  * ******/
router.get('/modify', (request, response) => {
    console.log("route [router]: modify");
    // TODO : pass card id from get or post method
    routeAddModify.modify(request, response, 0);
});

router.get('/delete', (request, response) => {
  console.log("route [router]: delete");
  routeDelete.delete(request, response);
});

 /** ***
  * Page login
  * @param {none}
  * @return {none}
  * @callback {none}
  * ******/
router.get('/login', (request, response) => {
    console.log("route [router]: login");
    // TODO
});

 /** ***
  * Page register
  * @param {none}
  * @return {none}
  * @callback {none}
  * ******/
router.get('/register', (request, response) => {
    console.log("route [router]: register");
    // TODO
});

/** ############################ Exports ############################ */
module.exports = router;