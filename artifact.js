$("#app").html(`<div class="loader"></div>`);

$.ajax({
  type: 'GET',
  url: "/artifact-1.html",
  dataType: 'html',
  success: function (res){
     $("#app").html(res);
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