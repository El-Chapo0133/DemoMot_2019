/** ############################################ Require Part ############################################ */
let mysql = require('mysql');

/** ############################################ Connexion Part ############################################ */
/** ***
 * Connexion values
 *  -> get from the sql database export
 */
var conn = mysql.createConnection({
    host: "localhost",
    database: "demomotdb",
    user: "demomotuser",
    password: "jL6H922e7u2zt3sMDHKa"
});

/** ***
 * Connect onto the database
 * @param {none}
 * @return {none}
 * @callback => log errors or log result
 */
var createConnector = conn.connect((err) => {
    if (err) {
        console.log("ouch! " + err);
        throw err;
    } else {
        console.log("connected onto the db ! ");
    }
});

/** ***
 * execute a query with a collback for errors
 * @param {String} sql => query to execute
 * @return {none}
 * @collback => log errors or log result
 */
var executeSql = (sql) => {
    createConnector;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log("ouch! " + err);
            throw err;
        } else {
            return result;
        }
    });
};
/** ***
 * try the connexion with the database
 * @param {none}
 * @return {String} => string value of the connexion
 * @collback {none}
 */
var tryConnexion = () => {
    if (conn.state !== "connected") {
        return String(conn.state);
    } else {
        return "not created";
    }
};

/** ############################################ Query DB Part ############################################ */
/** ***
 * get data from table Card
 * @param {none}
 * @return {data}
 * @collback {none}
 */
var getAllCards = () => {
    /** reconnect onto the db */
    // createConnector;
    /** sql query [string] */
    console.log("§");
    var sql = "SELECT idCard, carTitle, carContent, carDesc, carMetrique FROM Card LIMIT 0";

    console.log("#" + sql);

    /** execute the query `sql` */
    var result = executeSql(sql);
    
    /** delete sql query */
    sql = undefined;
    delete(sql);

    return result;
};
/** ================================================================== */
/** ***
 * insert card into the table Card
 * @param {String} _title   => title of the new card
 * @param {String} _content => content of the new card
 * @param {String} _desc    => description of the new card
 * @param {Integer} _metric => metric of the new card (priority)
 * @return {none}
 * @collback {none}
 */
var insertCard = (_title, _content, _desc, _metric) => {
    /** reconnect onto the db */
    createConnector();
    /** sql query [string] */
    var sql = "INSERT INTO Card (carTitle, carContent, carDesc, carMetrique) VALUES ('" + _title + "', '" + _content + "', '" + _desc + "', " + _metric + ")";

    /** execute the query `sql` */
    executeSql(sql);

    /** delete sql query */
    sql = undefined;
    delete(sql);
};
/** ================================================================== */
/** ***
 * get every user from the database
 * @param {none}
 * @return {none}
 * @callback {none}
 */
var getAllUser = () => {
   /** reconnect onto the db */
   createConnector();
   /** sql query [string] */
   var sql = "SELECT idUser, useName, useSurname, useEmail, useLogin, usePassword, useImage, useDesc FROM User LIMIT 0";

   /** execute the query `sql` */
   executeSql(sql);

   /** delete sql query */
   sql = undefined;
   delete(sql);
}


/** ############################################ Export part ############################################ */
module.exports = getAllCards;
module.exports = insertCard;
module.exports = tryConnexion;