// Declaring global variables
var today = dayjs();
var full_name = "";
var index;
var tarotDesc = [];
var tarotName = [];
var historySign;
var historyName;
var tarotID;

today = today.format('MM/DD/YYYY');
// Empty the current horoscope section of the page
function clear() {
    console.log("inside clear");
    $(".curr-hor").empty();
}
// function to display tarto information with a modal for the selected card
function updatetarot(tarotData) {
    console.log("inside     update tarot", tarotData);
    for (i = 0; i < tarotData.cards.length; i++) {
        console.log("For card number: ", i, " info: ", tarotData.cards[i]);
        console.log("You drew a ", tarotData.cards[i].type, " card from the ", tarotData.cards[i].suit, " suit ");
        console.log("Desc:  ", tarotData.cards[i].desc);
        tarotName[i] = tarotData.cards[i].name;
        tarotDesc[i] = tarotData.cards[i].desc;
    }
}
// function for AHAX request to get random tarot cards
function tarot() {
    console.log("Inside tarot function");
    $.ajax({
        type: 'GET',
        url: 'https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=16',
        success: function (tarotData) {
            console.log(tarotData);
            updatetarot(tarotData);
        }
    });
}

// function to update the page with horotscope information 
function updatePage(horData, sign) {


    sign = sign.toUpperCase();


    var $currentHorEl = $("<ul>");
    $currentHorEl.addClass("curr-hor");
    $("#horoscope").append($currentHorEl);

    console.log(horData);
    var color = horData.color;
    var $currentHorItem = $("<li>");
    $(".curr-hor").append($currentHorItem);
    $currentHorItem.append("<h6> Hello " + full_name + "!!. This is your Horoscope for " + today + "</h6>" + "<br>");
    $currentHorItem.append("<h6> Your sun sign is " + sign + " based on your birthday between " + horData.date_range + "</h6>" + "<br>");
    $currentHorItem.append("<h6>" + horData.description + "</h6>" + "<br>");
    $currentHorItem.append("<h6> Mood: " + horData.mood + " </h6>" + "<br>");
    $currentHorItem.append("<h6> Your lucky color is: " + horData.color + "</h6>" + "<br>");
    $currentHorItem.append("<h6> Your lucky number is: " + horData.lucky_number + "</h6>" + "<br>");
    $currentHorItem.append("<h6> Your lucky time is: " + horData.lucky_time + "</h6>" + "<br>");
    console.log("Color is: ", color);
    if (window.document.title !== "Astrozoders") {
        tarot();
    }
    if (index) {

        historySign = sign;
        historyName = full_name;
        console.log("type of historysing: ", typeof (historySign), "type of name: ", typeof (historyName));
        historySign = JSON.stringify(historySign);
        localStorage.setItem('sign', historySign);
        historyName = JSON.stringify(historyName);
        localStorage.setItem('name', historyName);

    }
}

//  Function to build the URL for the API call
function buildURL(sign) {

    console.log("Inside buildURL");
    if (index) {
        console.log("index: ", index);
        full_name = $("#name").val().trim();
        console.log("Name input: ", full_name);
        if (full_name === "") {
            console.log("Name is not entered");
            $('.modal').modal();
            $('.modal').modal('open');
            return;
        }
    }
    clear();

    console.log(sign);
    var queryURL = "https://aztro.sameerkumar.website?";
    var queryParams = {};
    queryParams.sign = sign;
    queryParams.day = "today";
    var queryURL = queryURL + $.param(queryParams);
    console.log("------------------------------------");
    console.log("QueryURLall", queryURL);
    console.log("'https://aztro.sameerkumar.website?sign=aries&day=today',");
    // AjAX request to API to retrieve horoscope info
    $.ajax({
        type: 'POST',
        url: 'https://aztro.sameerkumar.website?sign=aries&day=today',
        url: queryURL,
        success: function (horData) {
            console.log(horData);
            updatePage(horData, sign);
        }
    });
};
// this function will be executed when the page is loaded
$(document).ready(function () {

    $('.sidenav').sidenav();
    console.log(window.document.title);
    if (window.document.title === "Tarot") {
        console.log("On Tarot Page");
        tarot();
    }
    else if (window.document.title === "Astrozoders") {
        index = true;
        var name = JSON.parse(localStorage.getItem('name'));
        console.log("On Main Page ", name);
        if (name !== null) {
            historySign = JSON.parse(localStorage.getItem('sign'));
            historyName = JSON.parse(localStorage.getItem('name'))
            $("#name").val(historyName);
            console.log(historySign, " ", historyName);
            sign = historySign;
            buildURL(sign);

        }
    }
    else {
        console.log("On Sign Page");
        var sign = window.document.title;
        console.log("Sign from title is: ", sign);
        console.log("index flag set to: ", index);
        index = false;
        console.log("index flag set to: ", index);
        buildURL(sign);

    }
})

// Event listner for sogns 
$(".sign").on("click", function () {
    localStorage.clear();

    var sign = this.id;
    buildURL(sign);

});

// Evennt listner for tarot cards
$(".tarot").on("click", function () {
    if (tarotID === this.id) {

        console.log("Card Closed");
        tarotID = "";
        $(".modal-content").children("p").empty();
        $(this).attr("data-state", "close");
    }
    else {
        tarotID = this.id
        console.log($(this).attr("data-state"));
        var index = this.id;

        console.log(this);
        console.log($(this).children().children("p").html());

        var pEl = ($(this).children().children("p"));
        console.log("p Element: ", pEl, "length: ", pEl[0].length);
        $(".modal-content").children("p").empty();
        $(this).children().children("p").html(tarotName[index])
        $(".modal-content").append("<p>" + tarotDesc[index] + "</p>");
        console.log($(".modal-content"));
        if (($(this).attr("data-state")) === "close") {
            $('.modal').modal();
            $('#modal1').modal('open');
            $(this).attr("data-state", "open");
        }
        else {
            $(this).attr("data-state", "close");
        }
    }
});

// Event listner for clear button 
$("#clear").on("click", function () {
    console.log("inside ckear");
    localStorage.clear();
    clear();
    var name = "";
    $("#name").val(name);

}); 