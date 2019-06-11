let mysql = require('mysql');


class Database {
    constructor() {
        console.log("API check!");
    }
    /** ***
     * Instence values for database connexion
     * @param {none}
     * @return {none}
     * @callback {none}
     */
    instanceDbVar() {
        /** ***
         * Connexion values
         *  -> get from the sql database export
         */
        return mysql.createConnection({
            host: "localhost",
            database: "demomotdb",
            user: "demomotuser",
            password: "jL6H922e7u2zt3sMDHKa"
        });
    }
    /** ***
     * Connect onto the database
     * @param {none}
     * @return {none}
     * @callback => log errors or log result
     */
    createConnector() {
        var connector = this.instanceDbVar();
        connector.connect((err) => {
            if (err) {
                console.log("ouch! " + err);
                throw err;
            } else {
                console.log("connected onto the db ! ");
            }
        });
        return connector;
    }
    /** ***
     * execute a query with a collback for errors
     * @param {String} sql => query to execute
     * @return {none}
     * @collback => log errors or log result
     */
    executeSql(connector, sql, callback) {
        connector.query(sql, (err, result) => {
            if (err) {
                console.log("ouch! " + err);
                throw err;
            } else {
                callback(result);
                return result;
            }
        });
    }
    /** ***
     * try the connexion with the database
     * @param {none}
     * @return {String} => string value of the connexion
     * @collback {none}
     */
    tryConnexion(connector) {
        if (connector.state !== "connected") {
            return String(conn.state);
        } else {
            return "not created";
        }
    }
}

/** ##################################### Export Part ##################################### */
module.exports = Database;