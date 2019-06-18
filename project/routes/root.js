/** ############################ requires ############################*/
let express     = require('express')
let routeIndex  = require('./index')
let routeAdd    = require('./add')
let routeModify = require('./modify')
let routeDelete = require('./delete')
let date_format = require ('dateformat')

// routeur variable
let router = express.Router()

// customs variables
var countRouterAsk = 0

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
 *            -> finished 100%
 *          -> with modification [tag]
 *             i don't created json, i should do it :D
 * 
 ********************************************************************** */

 /** ***
  * Simply like a constructor but for every router's get/post function call
  * @param {none}
  * @return {none}
  * @callback {none}
  * ******/
router.use((request, response, next) => {
    var date = date_format(new Date(), "dd-mm-yyyy - HH:MM:ss")
    console.log('###########################################################################');
    console.log('Time                   :' + date)
    console.log('number of router ask   :' + ++countRouterAsk)
    console.log('url                    :' + request.url + '\n')
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
  console.log("route [router]: /  -> redirect to {index}")
  response.redirect('index')
});
 /** ***
  * Page index
  * @param {none}
  * @return {none}
  * @callback {none}
  * ******/
router.get('/index', (request, response) => {
    console.log("route [router]: index")
    routeIndex.index(request, response)
});

 /** ***
  * Page add
  * @param {none}
  * @return {none}
  * @callback {none}
  * ******/
router.post('/add', (request, response) => {
    console.log("route [router]: add")
    routeAdd.add(request, response)
});
 /** ***
  * Page modify
  * @param {none}
  * @return {none}
  * @callback {none}
  * ******/
router.get('/modify', (request, response) => {
    console.log("route [router]: modify")
    // TODO : pass card id from get or post method
    routeModify.modify(request, response)
});

/** ***
 * Page modify second (will update value)
 * @param {none}
 * @return {none}
 * @callback {none}
 */
router.post('/modify-second', (request, response) => {
  console.log("route [router]: modify-second")
  routeModify.modifySecond(request, response)
});

/** ***
 * Page delete
 * @param {none}
 * @return {none}
 * @callback {none}
 */
router.get('/delete', (request, response) => {
  console.log("route [router]: delete")
  routeDelete.delete(request, response)
});

 /** ***
  * Page login
  * @param {none}
  * @return {none}
  * @callback {none}
  * ******/
router.get('/login', (request, response) => {
    console.log("route [router]: login")
    // TODO
});

 /** ***
  * Page register
  * @param {none}
  * @return {none}
  * @callback {none}
  * ******/
router.get('/register', (request, response) => {
    console.log("route [router]: register")
    // TODO
});

/** ############################ Exports ############################ */
module.exports = router;