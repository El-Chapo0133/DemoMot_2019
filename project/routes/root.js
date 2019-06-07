let express = require('express');
let routeIndex = require('./index');
let routeAddModify = require('./add-modify');

let router = express.Router();

router.use((request, response, next) => {
    console.log('####################################################');
    console.log('Time :' + Date.now());
    console.log('url :' + request.url);
    next();
});

/** ############################ Routes ############################ */
router.get('/index', (request, response) => {
    console.log("route [router]: index");
    routeIndex.index(request, response);
});

router.get('/add', (request, response) => {
    console.log("route [router]: add");
    routeAddModify.add(request, response);
});

router.get('/modify', (request, response) => {
    console.log("route [router]: modify");
    // TODO : pass card id from get or post method
    routeAddModify.modify(request, response, 0);
});

router.get('/login', (request, response) => {
    console.log("route [router]: login");
    // TODO
});

router.get('/register', (request, response) => {
    console.log("route [router]: register");
    // TODO
});

/** ############################ Exports ############################ */
module.exports = router;