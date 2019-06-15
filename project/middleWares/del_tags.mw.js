let api = require('../api/api')

module.exports = {
    delTagsByCard: (idCard) => {
        SQL = "DELETE FROM t_Tag WHERE t_Tag.fkCard=" + idCard

        var database = new api

        var connector = database.createConnector()

        database.executeSql(connector, SQL, (err, result) => {
            if (err) {
                console.log("ouch! " + err)
            } else {
                console.log(result)
            }
        })
    }
}