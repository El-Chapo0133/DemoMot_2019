module.exports = {
    orderTag: (allCards, tagWanted) => {
        // start of json
        var returnJson = '{ "dataset": [\n'

        // check all tags of all cards
        allCards.dataset.forEach((card) => {
            card.tags.forEach((tag) => {
                // check without case sensitive
                if (tag.tagName) {
                    if (tag.tagName.toUpperCase() === tagWanted.toUpperCase()) {
                        returnJson += JSON.stringify(card) + ',\n'
                    }
                }
            })
        })
        // del last ',' if exists
        if (returnJson[returnJson.length - 2] != '[') {
            returnJson = returnJson.substring(0, returnJson.length - 2)
        }
        // then add end of json
        returnJson += "\n]}"
        // simple return json parsed
        return JSON.parse(returnJson)
    }
}