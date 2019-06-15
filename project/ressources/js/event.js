$(document).ready(() => {
    var toggleDivAdd = () => {
        $(".add-card-content-hidden").toggleClass("add-card-content-display");
    };
    var toggleDivModify = () => {
        $(".modify-card-content-hidden").toggleClass("modify-card-content-display");
    };

    $(".display-add-card").click(() => {
        toggleDivAdd();
    });
    $(".button-close").click(() => {
        toggleDivAdd();
        toggleDivModify();
    });
    $(".display-modify-card").click(() => {
        toggleDivModify();
    });
});