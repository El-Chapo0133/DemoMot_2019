var divTag = document.getElementById("addTagArea")

var tags = '{ "dataset": [\n]}'
var tags_json = JSON.parse(tags)

function writeTags() {
    divTag.innerHTML = ""
    tags_json.dataset.forEach(tag => {
        var colorHex = ""
        var color_array = tag.tagColor.split('.');
        // then create the hexadecimal number for displaying it after (css)
        // convert those three number in base 10 into base 16 in 2 digits (min/max)
        for (var i = 0; i < color_array.length; i++) {
            colorHex += ('00' + (parseInt(color_array[i], 10)).toString(16)).substr(-2);
        }
        divTag.innerHTML += '<h5 style="background: #' + colorHex + '">' + tag.tagName + '<button class="button-remove-tag" onclick="removeTag(' + tag.idTag + ')"><i class="fas fa-times"></i></button></h5>'
    })

    document.getElementById("json_tags").value = tags
}

function addTag() {
    var name = document.getElementById("inputTag").value
    var color = document.getElementById("select-add").value

    if (name && name.length <= 40) {
        if (tags.length !== 17) {
            tags = tags.substring(0, tags.length - 2) + ','
        } else {
            tags = tags.substring(0, tags.length - 2)
        }

        var nextId = tags_json.dataset.length + 1
        var newTag = '{ "idTag": ' + nextId + ', "tagName": "' + name + '", "tagColor": "' + color + '", "idCard": 0 }'
        
        tags += newTag + '\n]}'

        tags_json = JSON.parse(tags)
        
        document.getElementById("inputTag").value = ""

        writeTags()
    }
}

function removeTag(id) {
    divTag.innerHTML = ""

    var rewriteJson = '{ "dataset": [\n'
    // rewrite json
    for (var i = 0; i < tags_json.dataset.length; i++) {
        if (tags_json.dataset[i].idTag !== id) {
            rewriteJson += '{ "idTag": ' + i + ', "tagName": "' + tags_json.dataset[i].tagName + '", "tagColor": "' + tags_json.dataset[i].tagColor + '", "idCard": 0 }\n,'
        }
    }
    rewriteJson = rewriteJson.substring(0, rewriteJson.length - 1) + '\n]}'

    tags = rewriteJson

    tags_json = JSON.parse(rewriteJson)

    writeTags()
}