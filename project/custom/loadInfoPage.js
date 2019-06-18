let ejs     = require('ejs')

module.exports = {
    loadInfoPage: (title, message, callback) => {
        obj = {
            "pageTitle": title,
            "message": message
        }

        ejs.renderFile('views/infoPage.ejs', obj, (err, str) => {
            if (err) {
                throw err
            } else {
                callback(str)
            }
        })
    }
}