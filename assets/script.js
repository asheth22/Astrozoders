
$(".sign").on("click", function (event) {
    console.log("event listner activated");
    // event.preventdefault();
    // console.log(event);
    console.log(event.target.id);
    console.log(this.id);
    var queryURL = "https://aztro.sameerkumar.website?";
  
    var sign = this.id; 
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
        success:function(data){
        console.log(data);
        }
         });
});



