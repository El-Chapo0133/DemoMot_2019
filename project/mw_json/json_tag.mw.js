/** ################################# Consts ################################# */


/** ################################# Requires ################################# */


/** **********************************************************************
 * Autor : Levêque Loris
 * Creation Date : 05.06.2019
 * Modification Date : 06.06.2019
 * 
 * Description :
 *      Reconstruct json middleware
 *      Reconstruct tags by cards from a string
 *        -> 2 values [string] séparated with ','
 *        -> create an under-json named "tags" with an array of tags allowed to the card
 * 
 * Errors :
 *      
 * 
 ********************************************************************** */

 /**
  * start of the json
  * @type {string}
  */
const startJson = '{ "dataset": [\n';
/**
 * end of the json
 * @type {string}
 */
const endJson = ']}';
/**
 * a simple tabulation
 * @type {string}
 */
const tab = '   ';

/**
  * variable of the json in string
  *  -> to parse and return
  * @type {string}
  */
var reconstructJson;

/** ###################################### Exports ###################################### */
module.exports = {
    createJsonTag(_initialJson) {
        reconstructJson = startJson;
        // index count global
        var count = 0;
        // check if the object has been made for do not rewrite second line
        var made = false;
        // for every object (card)
        _initialJson.forEach(element => {
            // get string
            var element_string = JSON.stringify(element);

            element_string = element_string.replace('\n', '');
            // parse it from ','
            var element_array = element_string.split(",");

            // wil create an array of object on every object
            for (var i = 0; i < element_array.length; i++) {
                if (element_array[i].startsWith('"tag') && made === false) {
                    made = true;
                    var tags = tab + '"tags":[\n';

                    // get only the value
                    var tagNameSplitted = element_array[i].substring(11, element_array[i].length - 1);
                    var tagColorSplitted = element_array[i + 1].substring(12, element_array[i + 1].length - 2);

                    // parse it (seperate with ';') and add '"' on every side of data (string)
                    //  -> SQL GROUP_CONCAT(tagName, SEPARATE ;)
                    var tempArray = tagNameSplitted.split(';') + ';' + tagColorSplitted.split(';');
                    tempArray = tempArray.split(';');
                    var tagsValue = [];
                    for (var j = 0; j < tempArray.length; j++) {
                        tagsValue[j] = tempArray[j].split(',');
                    }

                    for (var k = 0; k < tagsValue.length; k++) {
                        for (var j = 0; j < tagsValue[k].length; j++) {
                            if (tagsValue[k][j] === 'ul') {
                                tagsValue[k][j] = 'null';
                            }
                            if (tagsValue[k][j] !== 'null') {
                                tagsValue[k][j] = '"' + tagsValue[k][j] + '"';
                            }
                        }
                    }

                    /*
                     *will create object(s) with 3 conditions :
                        if no object send (no tags)
                        if only one object send (one tag)
                        if more than one object send (<1 tags)
                     */
                    for (var k = 0; k < tagsValue[0].length; k++) {
                        if (tagsValue[0].length === 0) {
                            // if no tag(s)
                            tags += tab + tab + '{\n';
                            tags += tab + tab + tab + '"tagName": null,\n';
                            tags += tab + tab + tab + '"tagColor": null\n';
                            tags += tab + tab + '}\n';
                        } else if (k === tagsValue[0].length - 1) {
                            // if only one tag
                            tags += tab + tab + '{\n';
                            tags += tab + tab + tab + '"tagName": ' + tagsValue[0][k] + ',\n';
                            tags += tab + tab + tab + '"tagColor": ' + tagsValue[1][k] + '\n';
                            tags += tab + tab + '}\n';
                        } else {
                            // if tags > 1
                            if (k === tagsValue[0].length - 1) {
                                // last index
                                tags += tab + tab + '{\n';
                                tags += tab + tab + tab + '"tagName": ' + tagsValue[0][k] + ',\n';
                                tags += tab + tab + tab + '"tagColor": ' + tagsValue[1][k] + '\n';
                                tags += tab + tab + '}\n';
                            } else {
                                // not last index
                                tags += tab + tab + '{\n';
                                tags += tab + tab + tab + '"tagName": ' + tagsValue[0][k] + ',\n';
                                tags += tab + tab + tab + '"tagColor": ' + tagsValue[1][k] + '\n';
                                tags += tab + tab + '},\n';
                            }
                        }

                    }
                    // close array and object
                    tags += tab + ']}';

                    // add ',' if it's not the last object
                    if (count != element_array.length - 1) {
                        tags += ',\n';
                    } else {
                        tags += '\n';
                    }
                    // then add the object created on the string json
                    reconstructJson += tags;

                } else if (!element_array[i].startsWith('"tag') && i != element_array.length) {
                    // if its not a line that we need to change
                    reconstructJson += tab + element_array[i] + ',\n';

                    made = false;
                }
            }
            count++;
        });
        // delete the last ',' and add '\n' (bug without this)
        reconstructJson = reconstructJson.substring(0, reconstructJson.length - 2);
        reconstructJson += '\n';
        // add the end of the json
        reconstructJson += endJson;
        // parse it into a json file
        var lastJson = JSON.parse(reconstructJson);
        // then return it
        return lastJson;
    }
}