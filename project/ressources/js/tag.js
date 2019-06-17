var divTag = document.getElementById("addTagArea")

var tags = '{ "dataset": []}'
var count = 0

function addTag() {

    var name = document.getElementById("inputTag").value
    var color = document.getElementById("select-add").value

    var colorHex = ""

    var color_array = color.split('.');
    // then create the hexadecimal number for displaying it after (css)
    // convert those three number in base 10 into base 16 in 2 digits (min/max)
    for (var i = 0; i < color_array.length; i++) {
        colorHex += ('00' + (parseInt(color_array[i], 10)).toString(16)).substr(-2);
    }

    if (name && name.length <= 40) {
        if (count !== 0) {
            tags = tags.substring(0, tags.length - 2) + ','
        } else {
            tags = tags.substring(0, tags.length - 2)
        }

        var newTag = '{ "idTag": ' + count + ', "tagName": "' + name + '", "tagColor": "' + color + '", "idCard": 0 }'
        
        tags += newTag + ']}'

        count++

        document.getElementById("inputTag").value = ""

        divTag.innerHTML += '<h5 style="background: #' + colorHex + '">' + name + '<button class="button-remove-tag" onclick="removeTag(' + count + ')"><i class="fas fa-times"></i></button></h5>'
    }
}

function removeTag(id) {
    
}