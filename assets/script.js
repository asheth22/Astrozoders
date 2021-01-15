var today = dayjs();
today = today.format("MM/DD/YYYY");
var full_name = "";

$(document).ready(function () {
  $(".modal").modal();
});

function clear() {
  console.log("inside clear");
  $(".curr-hor").empty();
}

$(".sign").on("click", function (event) {
  console.log("event listner activated");
  full_name = $("#name").val().trim();
  console.log("Name entered: ", full_name, "type name is: ", typeof full_name);
  if (full_name === "") {
    console.log("Name is not entered");
    $(".modal").modal("open");
    return;
  }
  clear();

  console.log(event.target.id);
  console.log(this.id);
  var queryURL = "https://aztro.sameerkumar.website?";

  var sign = this.id;
  var queryParams = {};
  queryParams.sign = sign;
  queryParams.day = "today";
  var queryURL = queryURL + $.param(queryParams);
  console.log("------------------------------------");
  console.log("QueryURLall", queryURL);
  console.log("'https://aztro.sameerkumar.website?sign=aries&day=today',");

  $.ajax({
    type: "POST",
    url: "https://aztro.sameerkumar.website?sign=aries&day=today",
    url: queryURL,
    success: function (horData) {
      console.log(horData);
      updatePage(horData, sign);
    },
  });
});

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
  $currentHorItem.append(
    "<h6> Hello " +
      full_name +
      "!!. This is your Horoscope for " +
      today +
      "</h6>" +
      "<br>"
  );
  $currentHorItem.append(
    "<h6> Your sun sign is " +
      sign +
      " based on your birthday between " +
      horData.date_range +
      "</h6>" +
      "<br>"
  );
  $currentHorItem.append("<h6>" + horData.description + "</h6>" + "<br>");
  $currentHorItem.append(
    "<h6> Your would be in " + horData.mood + " mood today </h6>" + "<br>"
  );
  $currentHorItem.append(
    "<h6> Your lucky color is: " + horData.color + "</h6>" + "<br>"
  );
  $currentHorItem.append(
    "<h6> Your lucky number is: " + horData.lucky_number + "</h6>" + "<br>"
  );
  $currentHorItem.append(
    "<h6> Your lucky time is: " + horData.lucky_time + "</h6>" + "<br>"
  );
  console.log("Color is: ", color);
}
