const secBeforeRedirect = 0
const timeBeforeUpdate = 1000
var span = document.getElementById("time-beforeRedirect")
var count = 4

setInterval(() => {
    if (count > secBeforeRedirect) {
        span.innerHTML = count--
    }
}, timeBeforeUpdate)