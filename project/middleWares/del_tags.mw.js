let api = require('../api/api')

module.exports = {
    delTagsByCard: (idCard, callback) => {
        SQL = "DELETE FROM t_Tag WHERE t_Tag.fkCard=" + idCard

        var database = new api

        var connector = database.createConnector()

        database.executeSql(connector, SQL, (result) => {
            // delete constraint key bug
            callback()
        })
    }
}