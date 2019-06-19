module.exports = {
    getColorHex(stringColor) {
        if (stringColor !== 'null') {
            // remove first and last char (") -> useless -> add it at least
            stringColor = stringColor.substring(1, stringColor.length - 1);
            // split it from '.'
            var color_array = stringColor.split('.');
            // then create the hexadecimal number for displaying it after (css)
            var toReturn = "";
            // convert those three number in base 10 into base 16 in 2 digits (min/max)
            for (var i = 0; i < color_array.length; i++) {
                toReturn += ('00' + (parseInt(color_array[i], 10)).toString(16)).substr(-2);
            }

            toReturn = '"' + toReturn.toString() + '"';
            // then return it
            return toReturn;
        } else {
            return null;
        }
    },
    getColor10(stringColor) {
        if (stringColor !== 'null') {
            var toReturn = ""
            for (var i = 0; i < 6; i += 2) {
                var actualColor = stringColor[i] + stringColor[i + 1]
                toReturn += (parseInt(actualColor, 16)).toString(10) + '.';
            }
            toReturn = toReturn.substring(0, toReturn.length - 1)

            // then return it
            return toReturn;
        } else {
            return null;
        }
    }
}