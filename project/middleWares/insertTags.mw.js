let api     = require('../api/api')

module.exports = {
    /**
     * tags syntax :
     * tags = [{
     *      tagName: "",
     *      tagColor: ""
     * }, {...}]
     */
    insertTags: (tags, idCard, callback) => {

        var count = 0
        // api variable
        var database = new api
        // creation connector
        var connector = database.createConnector()
        // insert each tags

        // add every tag one per one
        // if here's one or more tag
        if (tags.dataset.length >= 1) {
            tags.dataset.forEach((tag) => {
                var SQL = "INSERT INTO t_Tag (tagName, tagColor, fkCard) VALUES ('" + tag.tagName + "', '" + tag.tagColor + "', " + idCard + ")"

                database.executeSql(connector, SQL, (result) => {
                    count++
                    console.log("tag added :" + tag.tagName)
                    if (count === tags.dataset.length) {
                        callback()
                    }
                })
            });
        } else {
            // if no tag specified
            callback()
        }
    }
}