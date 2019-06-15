/*var button_display = document.getElementById("displayAddCard");
       
var toggleDivAdd = () => {
    var div_addCard = document.getElementsByClassName("add-card-content-hidden")
    div_addCard.toggleClass("add-card-content-display");
};
        
button_display.addEventListener("click", () => {
    console.log("test");
    toggleDivAdd();
});*/
/*
var jsdom = require('jsdom');
const { window_custom } = new jsdom();
const { document_custom } = (new jsdom('')).window_custom;
global.document = document_custom;

var $ = require('jquery')(window_custom);
*/
$(document).ready(() => {
    var toggleDivAdd = () => {
        $(".add-card-content-hidden").toggleClass("add-card-content-display");
    };

    $(".display-add-card").click(() => {
        toggleDivAdd();
    });
    $(".button-close").click(() => {
        toggleDivAdd();
    });
});