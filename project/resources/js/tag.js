var divTag = document.getElementById("addTagArea")

var isGood = true
var tags
var idCard
if (!document.getElementById("idCard").innerHTML || document.getElementById("idCard").innerHTML === "") {
    idCard = null
} else {
    idCard = document.getElementById("idCard").innerHTML
}
if (!document.getElementById("tags_json").innerHTML || document.getElementById("tags_json").innerHTML === "") {
    tags = '{ "dataset": []}'
} else {
    tags = document.getElementById("tags_json").innerHTML
}
var tags_json = JSON.parse(tags)

function writeTags() {
    divTag.innerHTML = ""
    tags_json.dataset.forEach(tag => {
        console.log(tag.tagColor.split('.').length)
        if (tag.tagColor.split('.').length > 2) {
            var colorHex = ""
            var color_array = tag.tagColor.split('.');
            // then create the hexadecimal number for displaying it after (css)
            // convert those three number in base 10 into base 16 in 2 digits (min/max)
            for (var i = 0; i < color_array.length; i++) {
                colorHex += ('00' + (parseInt(color_array[i], 10)).toString(16)).substr(-2);
            }
            tag.tagColor = colorHex
        }
        divTag.innerHTML += '<h5 style="background: #' + tag.tagColor + '">' + tag.tagName + '<button class="button-remove-tag" onclick="removeTag(' + tag.idTag + ')"><i class="fas fa-times"></i></button></h5>'
    })
    document.getElementById("json_tags").value = tags
}
function addTag() {
    var name = document.getElementById("inputTag").value
    var color = document.getElementById("select-add").value

    for (var i = 0; i < tags_json.dataset.length; i++) {
        if (name === tags_json.dataset[i].tagName) {
            alert("Nom de tag déjà utilisé")
            return
        }
    }

    for (var i = 0; i < name.length; i++) {
        if (name[i] === '"' || name[i] === '#' || name[i] === '*' || name[i] === '\'' || name[i] === '|' || name[i] === ' ' || name[i] === '-') {
            isGood = false
        }
    }

    if (name && name.length <= 40 && isGood === true) {
        if (tags.length !== 16) {
            tags = tags.substring(0, tags.length - 2) + ','
        } else {
            tags = tags.substring(0, tags.length - 2)
        }

        var nextId = tags_json.dataset.length + 1
        var newTag = '{ "idTag": ' + nextId + ', "tagName": "' + name + '", "tagColor": "' + color + '" }'
        
        tags += newTag + '\n]}'
        
        tags_json = JSON.parse(tags)
        
        document.getElementById("inputTag").value = ""

        writeTags()
    } else if (name.length >= 40) {
        alert("Veuillez donner un tag de moins de 40 caractères")
    } else if (!name) {
        alert("Veuillez remplir le champ Tag pour donner un nom à votre tag")
    } else if (!isGood) {
        alert("Caractère interdit\n\", #, *, ', |, [espace], -")
    } else {
        alert("Une erreur non répértoriée à été générée, veuillez m'excuser du dérangement")
    }
    isGood = true
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