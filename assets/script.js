var today = dayjs();
today = today.format('MM/DD/YYYY');
var full_name = ""; 
var index = true; 
var tarotDesc = [];
var tarotName = [];
var historySign; 
var historyName;   
var modalFlag = true;
var count = 0;
var tarotID; 
  

    $(document).ready(function(){ 
        
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
            else { 
                if (localStorage.getItem('name') !== undefined) {
                    historySign = JSON.parse(localStorage.getItem('sign')); 
                    historyName = JSON.parse(localStorage.getItem('name'))
                    console.log(historySign, " ", historyName); 
                    sign = historySign; 
                    buildURL(sign); 
                   
                }
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
    localStorage.clear(); 
    historyName =  $("#name").val().trim();
    // historySign = ""; 
    console.log("local storage cleared: ", localStorage.getItem('nam'), "historyname: ", historyName);
    var sign = this.id;
    buildURL(sign);

}); 
function buildURL(sign) {

    console.log("event listner activated");
    if (index) {
        
        if (historyName === null ) {          
            
            full_name = $("#name").val().trim();
            console.log("Name entered: ", full_name, "type name is: ", typeof (full_name));
            if (full_name === "") {
                console.log("Name is not entered");
                $('.modal').modal();
                $('.modal').modal('open');
                return;
            }
        }
        else {
            full_name = historyName; 
            $("#name").val(full_name);      
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
    $currentHorItem.append("<h6> Mood " + horData.mood  + " </h6>" + "<br>"); 
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
        console.log("type of historysing: ", typeof(historySign), "type of name: ",typeof(historyName));
        historySign = JSON.stringify(historySign);        
        localStorage.setItem('sign', historySign);
        historyName = JSON.stringify(historyName);        
        localStorage.setItem('name', historyName);

    }
}
function tarot() {
    console.log("Inside tarot function");
    $.ajax({
        type:'GET',        
        url: 'https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=16',               
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
    if (tarotID !== this.id) {
        tarotID = this.id
        console.log($(this).attr("data-state"));
        var index = this.id;
        
        console.log(this);
        console.log($(this).children().children("p").html());
            
        var pEl =  ($(this).children().children("p"));
        console.log("p Element: ", pEl, "length: ", pEl [0].length);
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
    else {
        console.log("Card Closed");
        tarotID = ""; 
        $(".modal-content").children("p").empty(); 
        $(this).attr("data-state", "close");
    }
});       