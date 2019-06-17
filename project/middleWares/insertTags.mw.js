let api     = require('../api/api')

module.exports = {
    /**
     * tags syntax :
     * tags = [{
     *      tagName: "",
     *      tagColor: "",
     *      idCard: X
     * }, {...}]
     */
    insertTags: (tags) => {
        // api variable
        var database = new api
        // creation connector
        var connector = database.createConnector()
        // insert each tags
        tags.forEach(tag => {
            const SQL = "INSERT INTO t_Tag (tagName, tagColor, fkCard) VALUES (" + tag.tagName + ", " + tag.tagcolor + ", " + tag.idCard + ")"

            database.executeSql(connector, SQL, (result) => {
                console.log("tag added :" + tag.tagName)
            })
        });
    }
}