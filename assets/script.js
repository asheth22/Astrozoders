var today = dayjs();
today = today.format('MM/DD/YYYY');
var full_name = ""; 
var index = true; 
var tarotDesc = [];
var tarotName = [];
var modalFlag = true;


   

    $(document).ready(function(){ 
        // $('.modal').modal();
        console.log(window.document.title);
        if (window.document.title !== "Tarot") {
            if (window.document.title !== "Astrozoders") {
                var sign = window.document.title;
                console.log("Sign from title is: ", sign);
                console.log("index flag set to: ", index);
                index = false;
                console.log("index flag set to: ", index);
                buildURL(sign);
            }
        }
        else {
            tarot(); 
        }
    })

function clear() {
    console.log("inside clear");
    $(".curr-hor").empty(); 
}

$(".sign").on("click", function (event) {

    var sign = this.id;
    buildURL(sign);

}); 
function buildURL(sign) {

    console.log("event listner activated");
    if (index) {
        full_name = $("#name").val().trim();
        console.log("Name entered: ", full_name, "type name is: ", typeof (full_name));
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
    var queryParams = { };
    queryParams.sign = sign;    
    queryParams.day = "today";
    var queryURL = queryURL + $.param(queryParams);
    console.log("------------------------------------");
    console.log("QueryURLall", queryURL);
    console.log("'https://aztro.sameerkumar.website?sign=aries&day=today',");
    
    $.ajax({
        type:'POST',
        url:'https://aztro.sameerkumar.website?sign=aries&day=today',
        url: queryURL,        
        success:function(horData){
            console.log(horData);
            updatePage(horData, sign);
        }
         });
};

function updatePage(horData, sign) {
    

    sign = sign.toUpperCase();
    
    // var name = $("#name").val().trim(); 
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
    $currentHorItem.append("<h6> Your will be " + horData.mood + " today </h6>" + "<br>"); 
    $currentHorItem.append("<h6> Your lucky color is: " + horData.color + "</h6>" + "<br>"); 
    $currentHorItem.append("<h6> Your lucky number is: " + horData.lucky_number + "</h6>" + "<br>"); 
    $currentHorItem.append("<h6> Your lucky time is: " + horData.lucky_time + "</h6>" + "<br>"); 
    console.log("Color is: ", color);
    if (window.document.title !== "Astrozoders") {
        tarot(); 
    }
}
function tarot() {
    console.log("Inside tarot function");
    $.ajax({
        type:'GET',
        // url: 'https://rws-cards-api.herokuapp.com/api/v1/cards/search?meaning=peace',
        url: 'https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=16',
        // url: queryURL,        
        success:function(tarotData){
            console.log(tarotData);
            updatetarot(tarotData); 
        }
         });
}
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
$(".tarot").on("click", function (event) {
    var count = 0; 
    var index = this.id; 
    console.log(event.target);
    console.log(this);
    console.log($(this).children().children("p").html());
    if ((count%2 == 0) &&  modalFlag) {
        modalFlag = false;    
        $(this).children().children("p").html(tarotName[index])
        $(".modal-content").append("<p>" + tarotDesc[index] + "</p>");
        $('.modal').modal();
        $('#modal1').modal('open');
        count++; 
}    
});       