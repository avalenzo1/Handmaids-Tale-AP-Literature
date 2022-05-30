$("#app").html(`<div class="loader"></div>`);

$.ajax({
  type: 'GET',
  url: "http://localhost:3000/UserRegistration",
  dataType: 'txt',
  success: function (response){
     //supposing you have an html element where you want to append 
     //the response, with an id like appendResponse
     $('#app').html(response);
  }
});

if(window.location.hash) {
  console.log("hello")
} else {
  console.log("nothing");
}

addEventListener('hashchange', function(e) {
  console.log("hello")
});